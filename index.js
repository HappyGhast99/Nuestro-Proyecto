require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const { initDb }   = require('./db');
const swaggerUi    = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const gamificationRoutes = require('./src/routes/GamificationRoutes');
const activityRoutes = require('./src/routes/ActivityRoutes'); // Importar nuevas rutas

const app = express();
app.use(cors({
  origin: '*', // Permitir desde cualquier origen para desarrollo, o restringirlo a http://localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api', gamificationRoutes);
app.use('/cursos', activityRoutes); // Usar las nuevas rutas de actividad

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Cursos', version: '1.0.0' },
    servers: [
      { url: 'https://cursos-api.onrender.com', description: 'Produccion' },
      { url: 'http://localhost:3000',            description: 'Local' }
    ]
  },
  apis: ['./index.js', './src/routes/*.js'] // Incluir rutas para Swagger
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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