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

/**
 * @swagger
 * /actividades:
 *   post:
 *     summary: Crea una nueva actividad en el calendario (CA 1)
 */
app.post('/actividades', (req, res) => {
  const { titulo, fecha, hora, etiquetas } = req.body;
  const r = db.prepare(
    'INSERT INTO actividades (titulo, fecha, hora, etiquetas) VALUES (?, ?, ?, ?)'
  ).run(titulo, fecha, hora, etiquetas);
  res.status(201).json({ id: r.lastInsertRowid, titulo, fecha, hora, etiquetas, posposiciones: 0 });
});

/**
 * @swagger
 * /actividades/{id}/posponer:
 *   put:
 *     summary: Pospone una tarea un máximo de 3 veces (CA 3)
 */
app.put('/actividades/:id/posponer', (req, res) => {
  const actividad = db.prepare('SELECT posposiciones FROM actividades WHERE id=?').get(req.params.id);
  
  if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
  
  if (actividad.posposiciones >= 3) {
    return res.status(403).json({ error: 'Límite de posposiciones alcanzado. Debes interactuar con la tarea.' });
  }

  db.prepare('UPDATE actividades SET posposiciones = posposiciones + 1 WHERE id=?').run(req.params.id);
  res.json({ mensaje: 'Actividad pospuesta exitosamente', posposiciones_actuales: actividad.posposiciones + 1 });
});

/**
 * @swagger
 * /actividades:
 *   get:
 *     summary: Obtiene todas las actividades para evaluar notificaciones (CA 2)
 */
app.get('/actividades', (req, res) => {
  res.json(db.prepare('SELECT * FROM actividades').all());
});

app.listen(3000, () => console.log('API en http://localhost:3000'));