require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const db           = require('./db');
const { initDb }   = db;
const swaggerUi    = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const gamificationRoutes = require('./src/routes/GamificationRoutes');
const activityRoutes = require('./src/routes/ActivityRoutes'); // Importar nuevas rutas
const mascotaRouter = require('./routes/mascota'); // Enrutador de mascotas

const app = express();
app.use(cors({
  origin: '*', // Permitir desde cualquier origen para desarrollo, o restringirlo a http://localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Cargar enrutador de mascotas
app.use('/api', mascotaRouter);
app.use('/api', gamificationRoutes);
app.use('/cursos', activityRoutes); // Usar las nuevas rutas de actividad

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'API FocusPets y Cursos', version: '1.0.0' },
    servers: [
      { url: 'https://cursos-api.onrender.com', description: 'Produccion' },
      { url: 'http://localhost:3000',            description: 'Local' }
    ]
  },
  apis: ['./index.js', './src/routes/*.js', './routes/*.js'] // Incluir rutas para Swagger
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =================================================================
// ENDPOINTS DE INCENTIVOS, RECOMPENSAS Y SUBTAREAS (MIGRADOS A POSTGRESQL)
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
app.post('/arranque/completar', async (req, res) => {
  const { duracion } = req.body;
  if (!duracion || (duracion !== 5 && duracion !== 10)) {
    return res.status(400).json({ error: 'La duración debe ser 5 o 10 minutos.' });
  }
  const descripcion = `Superada la inercia inicial: Sesión de ${duracion} minutos completada`;
  try {
    const r = await db.query('INSERT INTO mini_logros (descripcion) VALUES ($1) RETURNING id', [descripcion]);
    res.status(201).json({
      id: r.rows[0].id,
      mensaje: 'Mini-logro otorgado',
      logro: descripcion
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.get('/mini-logros', async (req, res) => {
  try {
    const logros = await db.query('SELECT * FROM mini_logros ORDER BY fecha DESC');
    res.json(logros.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.post('/tareas', async (req, res) => {
  const { titulo, descripcion, recompensa, duracion_bloque, proyecto_grande } = req.body;
  if (!titulo || typeof titulo !== 'string' || !titulo.trim() || !recompensa || typeof recompensa !== 'string' || !recompensa.trim()) {
    return res.status(400).json({ error: 'El título y la recompensa son obligatorios y deben ser textos no vacíos.' });
  }
  if (duracion_bloque === undefined || duracion_bloque === null || typeof duracion_bloque !== 'number' || !Number.isInteger(duracion_bloque) || duracion_bloque <= 0) {
    return res.status(400).json({ error: 'La duración del bloque es obligatoria y debe ser un número entero positivo mayor a 0.' });
  }
  
  try {
    const r = await db.query(
      'INSERT INTO tareas (titulo, descripcion, recompensa, duracion_bloque) VALUES ($1, $2, $3, $4) RETURNING id',
      [titulo.trim(), (descripcion || '').trim(), recompensa.trim(), duracion_bloque]
    );
    const newTaskId = r.rows[0].id;

    const subtareasCreadas = [];
    if (proyecto_grande) {
      const baseSubtareas = [
        `Preparar material para ${titulo.trim()}`,
        `Desarrollar núcleo principal de ${titulo.trim()}`,
        `Revisar y finalizar ${titulo.trim()}`
      ];
      for (const desc of baseSubtareas) {
        const rSub = await db.query(
          'INSERT INTO subtareas (tarea_id, descripcion, estado) VALUES ($1, $2, $3) RETURNING id',
          [newTaskId, desc, 'pendiente']
        );
        subtareasCreadas.push({
          id: rSub.rows[0].id,
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.get('/tareas', async (req, res) => {
  try {
    const lista = await db.query('SELECT * FROM tareas');
    res.json(lista.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.put('/tareas/:id/completar', async (req, res) => {
  const tareaId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM tareas WHERE id = $1', [tareaId]);
    const tarea = result.rows[0] || null;
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    await db.query("UPDATE tareas SET estado = 'completada' WHERE id = $1", [tareaId]);
    res.json({
      mensaje: 'Tarea completada con éxito',
      recompensa: tarea.recompensa
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.post('/tareas/:id/desglosar', async (req, res) => {
  const tareaId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM tareas WHERE id = $1', [tareaId]);
    const tarea = result.rows[0] || null;
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
      const r = await db.query(
        'INSERT INTO subtareas (tarea_id, descripcion, estado) VALUES ($1, $2, $3) RETURNING id',
        [tareaId, desc, 'pendiente']
      );
      creadas.push({
        id: r.rows[0].id,
        tarea_id: Number(tareaId),
        descripcion: desc,
        estado: 'pendiente'
      });
    }

    res.status(201).json({
      tarea_id: Number(tareaId),
      subtareas: creadas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.put('/subtareas/:id/estado', async (req, res) => {
  const { estado } = req.body;
  const subtareaId = req.params.id;

  if (estado !== 'pendiente' && estado !== 'completada') {
    return res.status(400).json({ error: 'El estado debe ser pendiente o completada.' });
  }

  try {
    const result = await db.query('SELECT * FROM subtareas WHERE id = $1', [subtareaId]);
    const subtarea = result.rows[0] || null;
    if (!subtarea) {
      return res.status(404).json({ error: 'Subtarea no encontrada.' });
    }

    await db.query('UPDATE subtareas SET estado = $1 WHERE id = $2', [estado, subtareaId]);

    let primerPasoRecompensado = false;
    if (estado === 'completada') {
      const countRes = await db.query(
        "SELECT COUNT(*) as count FROM subtareas WHERE tarea_id = $1 AND estado = 'completada'",
        [subtarea.tarea_id]
      );
      const totalCompletadas = parseInt(countRes.rows[0].count, 10);

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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.get('/subtareas/tarea/:tarea_id', async (req, res) => {
  const { tarea_id } = req.params;
  try {
    const lista = await db.query('SELECT * FROM subtareas WHERE tarea_id = $1', [tarea_id]);
    res.json(lista.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
app.delete('/tareas/:id', async (req, res) => {
  const tareaId = req.params.id;
  try {
    const i = await db.query('DELETE FROM tareas WHERE id = $1', [tareaId]);
    if (i.rowCount === 0) return res.status(404).json({ error: 'Tarea no encontrada.' });
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
