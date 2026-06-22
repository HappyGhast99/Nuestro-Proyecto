const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'focuspets',
});

// Helper function to initialize database tables
const initDb = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Create users table (for local gamification panel)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id                 SERIAL PRIMARY KEY,
        name               VARCHAR(255) NOT NULL,
        total_xp           INTEGER DEFAULT 0,
        current_streak     INTEGER DEFAULT 0,
        last_activity_date VARCHAR(50)
      );
    `);

    // Create cursos table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cursos (
        id         SERIAL PRIMARY KEY,
        nombre     VARCHAR(255) NOT NULL,
        instructor VARCHAR(255) NOT NULL,
        creditos   INTEGER NOT NULL,
        difficulty VARCHAR(50) CHECK(difficulty IN ('Easy', 'Medium', 'Hard')) DEFAULT 'Medium'
      );
    `);

    // Create tareas table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tareas (
        id              SERIAL PRIMARY KEY,
        titulo          VARCHAR(255) NOT NULL,
        descripcion     TEXT,
        recompensa      VARCHAR(255) NOT NULL,
        duracion_bloque INTEGER NOT NULL,
        estado          VARCHAR(50) DEFAULT 'pendiente'
      );
    `);

    // Create subtareas table
    await client.query(`
      CREATE TABLE IF NOT EXISTS subtareas (
        id          SERIAL PRIMARY KEY,
        tarea_id    INTEGER NOT NULL REFERENCES tareas(id) ON DELETE CASCADE,
        descripcion VARCHAR(255) NOT NULL,
        estado      VARCHAR(50) DEFAULT 'pendiente'
      );
    `);

    // Create mini_logros table
    await client.query(`
      CREATE TABLE IF NOT EXISTS mini_logros (
        id          SERIAL PRIMARY KEY,
        descripcion VARCHAR(255) NOT NULL,
        fecha       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create usuarios table (for mascot feature)
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id     SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email  VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    // Create mascotas table
    await client.query(`
      CREATE TABLE IF NOT EXISTS mascotas (
        id             SERIAL PRIMARY KEY,
        usuario_id     INTEGER NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
        nombre_mascota VARCHAR(255) NOT NULL,
        tipo_mascota   VARCHAR(50) NOT NULL,
        nivel          INTEGER NOT NULL DEFAULT 1,
        salud          INTEGER NOT NULL DEFAULT 100
      );
    `);

    // Seed default users if not exists in users
    const resUsers = await client.query('SELECT id FROM users LIMIT 1');
    if (resUsers.rowCount === 0) {
      await client.query("INSERT INTO users (name, total_xp, current_streak) VALUES ($1, 0, 0)", ['Estudiante Pro']);
    }

    // Seed default users if not exists in usuarios
    const resUsuarios = await client.query('SELECT id FROM usuarios LIMIT 1');
    if (resUsuarios.rowCount === 0) {
      await client.query("INSERT INTO usuarios (id, nombre, email) VALUES (1, 'Antonia B.', 'antonia@focuspets.com')");
      await client.query("INSERT INTO usuarios (id, nombre, email) VALUES (2, 'Joaquín B.', 'joaquin@focuspets.com')");
      await client.query("INSERT INTO usuarios (id, nombre, email) VALUES (3, 'Fernanda C.', 'fernanda@focuspets.com')");
      await client.query("INSERT INTO usuarios (id, nombre, email) VALUES (4, 'Martín D.', 'martin@focuspets.com')");
      await client.query("INSERT INTO usuarios (id, nombre, email) VALUES (5, 'Matthew O.', 'matthew@focuspets.com')");
      
      // Reset sequence so auto-increment works correctly for future inserts
      await client.query("SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios))");
    }
    
    await client.query('COMMIT');
    console.log('Database initialized successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  initDb,
  query: (text, params) => pool.query(text, params),
};
