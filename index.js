const express      = require('express');
const db           = require('./db');
const swaggerUi    = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Cursos', version: '1.0.0' },
    servers: [
      { url: 'https://cursos-api.onrender.com', description: 'Produccion' },
      { url: 'http://localhost:3000',            description: 'Local' }
    ]
  },
  apis: ['./index.js']
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos los cursos
 *     responses:
 *       200:
 *         description: Array de cursos
 */
app.get('/cursos', (req, res) => {
  res.json(db.prepare('SELECT * FROM cursos').all());
});

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Crea un nuevo curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:     { type: string }
 *               instructor: { type: string }
 *               creditos:   { type: integer }
 *     responses:
 *       201:
 *         description: Curso creado
 */
app.post('/cursos', (req, res) => {
  const { nombre, instructor, creditos } = req.body;
  const r = db.prepare(
    'INSERT INTO cursos (nombre, instructor, creditos) VALUES (?, ?, ?)'
  ).run(nombre, instructor, creditos);
  res.status(201).json({ id: r.lastInsertRowid, nombre, instructor, creditos });
});

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Modifica un curso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:     { type: string }
 *               instructor: { type: string }
 *               creditos:   { type: integer }
 *     responses:
 *       200:
 *         description: Curso actualizado
 *       404:
 *         description: No encontrado
 */
app.put('/cursos/:id', (req, res) => {
  const { nombre, instructor, creditos } = req.body;
  const i = db.prepare(
    'UPDATE cursos SET nombre=?, instructor=?, creditos=? WHERE id=?'
  ).run(nombre, instructor, creditos, req.params.id);
  if (i.changes === 0) return res.status(404).json({ error: 'Curso no encontrado' });
  res.json({ mensaje: 'Curso actualizado' });
});

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Elimina un curso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Curso eliminado
 *       404:
 *         description: No encontrado
 */
app.delete('/cursos/:id', (req, res) => {
  const i = db.prepare('DELETE FROM cursos WHERE id=?').run(req.params.id);
  if (i.changes === 0) return res.status(404).json({ error: 'Curso no encontrado' });
  res.json({ mensaje: 'Curso eliminado' });
});

app.listen(3000, () => console.log('API en http://localhost:3000'));
// =================================================================
// ENDPOINTS DE SUBTAREAS (HISTORIA DE USUARIO: CHECKLIST Y PROGRESO)
// =================================================================

/**
 * @swagger
 * /subtareas:
 *   post:
 *     summary: Escenario 1 - Registrar una nueva subtarea (Checklist)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tarea_id, descripcion]
 *             properties:
 *               tarea_id: { type: integer }
 *               descripcion: { type: string }
 *     responses:
 *       201:
 *         description: Subtarea creada con estado 'pendiente' por defecto (DoD)
 */
app.post('/subtareas', (req, res) => {
  const { tarea_id, descripcion } = req.body;
  
  if (!tarea_id || !descripcion || descripcion.trim() === "") {
    return res.status(400).json({ error: 'El id de la tarea principal y la descripción son obligatorios.' });
  }

  const estadoInicial = 'pendiente';
  
  const r = db.prepare(
    'INSERT INTO subtareas (tarea_id, descripcion, estado) VALUES (?, ?, ?)'
  ).run(tarea_id, descripcion, estadoInicial);
  
  res.status(201).json({ 
    id: r.lastInsertRowid, 
    tarea_id, 
    descripcion, 
    estado: estadoInicial 
  });
});

/**
 * @swagger
 * /subtareas/{id}/estado:
 *   put:
 *     summary: Escenario 2 - Cambiar estado a 'completada' y retornar progreso parcial
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [estado]
 *             properties:
 *               estado: { type: string, enum: [pendiente, completada] }
 *     responses:
 *       200:
 *         description: Estado actualizado y porcentaje calculado
 */
app.put('/subtareas/:id/estado', (req, res) => {
  const { estado } = req.body;
  const subtareaId = req.params.id;

  if (estado !== 'pendiente' && estado !== 'completada') {
    return res.status(400).json({ error: 'El estado solo puede ser pendiente o completada.' });
  }

  const subtarea = db.prepare('SELECT tarea_id FROM subtareas WHERE id = ?').get(subtareaId);
  if (!subtarea) {
    return res.status(404).json({ error: 'Subtarea no encontrada.' });
  }

  db.prepare('UPDATE subtareas SET estado = ? WHERE id = ?').run(estado, subtareaId);

  const todas = db.prepare('SELECT estado FROM subtareas WHERE tarea_id = ?').all(subtarea.tarea_id);
  const completadas = todas.filter(s => s.estado === 'completada').length;
  
  const porcentajeProgreso = todas.length > 0 ? Math.round((completadas / todas.length) * 100) : 0;

  res.json({ 
    mensaje: 'Estado de subtarea actualizado.',
    subtarea_id: Number(subtareaId),
    nuevo_estado: estado,
    tarea_principal_id: subtarea.tarea_id,
    barra_progreso: `${porcentajeProgreso}%`
  });
});

/**
 * @swagger
 * /subtareas/tarea/{tarea_id}:
 *   get:
 *     summary: Obtener subtareas de una tarea y su barra de progreso global
 */
app.get('/subtareas/tarea/:tarea_id', (req, res) => {
  const { tarea_id } = req.params;
  const lista = db.prepare('SELECT * FROM subtareas WHERE tarea_id = ?').all(tarea_id);
  
  const completadas = lista.filter(s => s.estado === 'completada').length;
  const porcentaje = lista.length > 0 ? Math.round((completadas / lista.length) * 100) : 0;

  res.json({
    tarea_id: Number(tarea_id),
    barra_progreso: `${porcentaje}%`,
    subtareas: lista
  });
});