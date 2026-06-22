const express      = require('express');
const db           = require('./db');
const swaggerUi    = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Cargar enrutador de mascotas
const mascotaRouter = require('./routes/mascota');
app.use('/api', mascotaRouter);

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'API FocusPets y Cursos', version: '1.0.0' },
    servers: [
      { url: 'https://cursos-api.onrender.com', description: 'Produccion' },
      { url: 'http://localhost:3000',            description: 'Local' }
    ]
  },
  apis: ['./index.js', './routes/*.js']
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

// =================================================================
// ENDPOINTS DE INCENTIVOS, RECOMPENSAS Y SUBTAREAS
// =================================================================

/**
 * @swagger
 * /arranque/completar:
 *   post:
 *     summary: Guarda un mini-logro al finalizar un temporizador de inicio rápido (5 o 10 min)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [duracion]
 *             properties:
 *               duracion: { type: integer, enum: [5, 10] }
 *     responses:
 *       201:
 *         description: Mini-logro otorgado
 */
app.post('/arranque/completar', (req, res) => {
  const { duracion } = req.body;
  if (!duracion || (duracion !== 5 && duracion !== 10)) {
    return res.status(400).json({ error: 'La duración debe ser 5 o 10 minutos.' });
  }
  const descripcion = `Superada la inercia inicial: Sesión de ${duracion} minutos completada`;
  const r = db.prepare('INSERT INTO mini_logros (descripcion) VALUES (?)').run(descripcion);
  res.status(201).json({
    id: r.lastInsertRowid,
    mensaje: 'Mini-logro otorgado',
    logro: descripcion
  });
});

/**
 * @swagger
 * /mini-logros:
 *   get:
 *     summary: Lista todos los mini-logros acumulados por el usuario
 *     responses:
 *       200:
 *         description: Lista de mini-logros
 */
app.get('/mini-logros', (req, res) => {
  const logros = db.prepare('SELECT * FROM mini_logros ORDER BY fecha DESC').all();
  res.json(logros);
});

/**
 * @swagger
 * /tareas:
 *   post:
 *     summary: Crea una nueva tarea con validación de recompensa y duración de bloque obligatorias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, recompensa, duracion_bloque]
 *             properties:
 *               titulo: { type: string }
 *               descripcion: { type: string }
 *               recompensa: { type: string }
 *               duracion_bloque: { type: integer }
 *     responses:
 *       201:
 *         description: Tarea creada
 */
app.post('/tareas', (req, res) => {
  const { titulo, descripcion, recompensa, duracion_bloque, proyecto_grande } = req.body;
  if (!titulo || typeof titulo !== 'string' || !titulo.trim() || !recompensa || typeof recompensa !== 'string' || !recompensa.trim()) {
    return res.status(400).json({ error: 'El título y la recompensa son obligatorios y deben ser textos no vacíos.' });
  }
  if (duracion_bloque === undefined || duracion_bloque === null || typeof duracion_bloque !== 'number' || !Number.isInteger(duracion_bloque) || duracion_bloque <= 0) {
    return res.status(400).json({ error: 'La duración del bloque es obligatoria y debe ser un número entero positivo mayor a 0.' });
  }
  
  const r = db.prepare(
    'INSERT INTO tareas (titulo, descripcion, recompensa, duracion_bloque) VALUES (?, ?, ?, ?)'
  ).run(titulo.trim(), (descripcion || '').trim(), recompensa.trim(), duracion_bloque);
  const newTaskId = r.lastInsertRowid;

  const subtareasCreadas = [];
  if (proyecto_grande) {
    const baseSubtareas = [
      `Preparar material para ${titulo.trim()}`,
      `Desarrollar núcleo principal de ${titulo.trim()}`,
      `Revisar y finalizar ${titulo.trim()}`
    ];
    for (const desc of baseSubtareas) {
      const rSub = db.prepare(
        'INSERT INTO subtareas (tarea_id, descripcion, estado) VALUES (?, ?, ?)'
      ).run(newTaskId, desc, 'pendiente');
      subtareasCreadas.push({
        id: rSub.lastInsertRowid,
        tarea_id: newTaskId,
        descripcion: desc,
        estado: 'pendiente'
      });
    }
  }

  res.status(201).json({
    id: newTaskId,
    titulo: titulo.trim(),
    descripcion: (descripcion || '').trim(),
    recompensa: recompensa.trim(),
    duracion_bloque,
    estado: 'pendiente',
    desglosada: !!proyecto_grande,
    subtareas: subtareasCreadas
  });
});

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Obtiene la lista de todas las tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
app.get('/tareas', (req, res) => {
  const lista = db.prepare('SELECT * FROM tareas').all();
  res.json(lista);
});

/**
 * @swagger
 * /tareas/{id}/completar:
 *   put:
 *     summary: Marca una tarea como completada y retorna la recompensa asociada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tarea completada y recompensa devuelta
 *       404:
 *         description: Tarea no encontrada
 */
app.put('/tareas/:id/completar', (req, res) => {
  const tareaId = req.params.id;
  const tarea = db.prepare('SELECT * FROM tareas WHERE id = ?').get(tareaId);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }
  db.prepare("UPDATE tareas SET estado = 'completada' WHERE id = ?").run(tareaId);
  res.json({
    mensaje: 'Tarea completada con éxito',
    recompensa: tarea.recompensa
  });
});

/**
 * @swagger
 * /tareas/{id}/desglosar:
 *   post:
 *     summary: Genera automáticamente de 3 a 5 subtareas recomendadas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       201:
 *         description: Subtareas generadas
 *       404:
 *         description: Tarea no encontrada
 */
app.post('/tareas/:id/desglosar', (req, res) => {
  const tareaId = req.params.id;
  const tarea = db.prepare('SELECT * FROM tareas WHERE id = ?').get(tareaId);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }
  
  const baseSubtareas = [
    `Preparar material para ${tarea.titulo}`,
    `Desarrollar núcleo principal de ${tarea.titulo}`,
    `Revisar y finalizar ${tarea.titulo}`
  ];

  const creadas = [];
  for (const desc of baseSubtareas) {
    const r = db.prepare(
      'INSERT INTO subtareas (tarea_id, descripcion, estado) VALUES (?, ?, ?)'
    ).run(tareaId, desc, 'pendiente');
    creadas.push({
      id: r.lastInsertRowid,
      tarea_id: Number(tareaId),
      descripcion: desc,
      estado: 'pendiente'
    });
  }

  res.status(201).json({
    tarea_id: Number(tareaId),
    subtareas: creadas
  });
});

/**
 * @swagger
 * /subtareas/{id}/estado:
 *   put:
 *     summary: Cambia el estado de una subtarea y entrega incentivo de primer paso si es la primera en completarse
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
 *         description: Estado actualizado y primer paso evaluado
 *       404:
 *         description: Subtarea no encontrada
 */
app.put('/subtareas/:id/estado', (req, res) => {
  const { estado } = req.body;
  const subtareaId = req.params.id;

  if (estado !== 'pendiente' && estado !== 'completada') {
    return res.status(400).json({ error: 'El estado debe ser pendiente o completada.' });
  }

  const subtarea = db.prepare('SELECT * FROM subtareas WHERE id = ?').get(subtareaId);
  if (!subtarea) {
    return res.status(404).json({ error: 'Subtarea no encontrada.' });
  }

  db.prepare('UPDATE subtareas SET estado = ? WHERE id = ?').run(estado, subtareaId);

  let primerPasoRecompensado = false;
  if (estado === 'completada') {
    const totalCompletadas = db.prepare(
      "SELECT COUNT(*) as count FROM subtareas WHERE tarea_id = ? AND estado = 'completada'"
    ).get(subtarea.tarea_id).count;

    if (totalCompletadas === 1) {
      primerPasoRecompensado = true;
    }
  }

  res.json({
    mensaje: 'Estado de subtarea actualizado.',
    subtarea_id: Number(subtareaId),
    nuevo_estado: estado,
    tarea_principal_id: subtarea.tarea_id,
    primer_paso_recompensado: primerPasoRecompensado
  });
});

/**
 * @swagger
 * /subtareas/tarea/{tarea_id}:
 *   get:
 *     summary: Obtener subtareas de una tarea
 *     parameters:
 *       - in: path
 *         name: tarea_id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de subtareas
 */
app.get('/subtareas/tarea/:tarea_id', (req, res) => {
  const { tarea_id } = req.params;
  const lista = db.prepare('SELECT * FROM subtareas WHERE tarea_id = ?').all(tarea_id);
  res.json(lista);
});

/**
 * @swagger
 * /tareas/{id}:
 *   delete:
 *     summary: Elimina una tarea y sus subtareas asociadas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
app.delete('/tareas/:id', (req, res) => {
  const tareaId = req.params.id;
  const i = db.prepare('DELETE FROM tareas WHERE id=?').run(tareaId);
  if (i.changes === 0) return res.status(404).json({ error: 'Tarea no encontrada.' });
  res.json({ mensaje: 'Tarea eliminada' });
});

app.listen(3000, () => console.log('API en http://localhost:3000'));
