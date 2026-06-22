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
    
    // Create users table
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

    // Seed default user if not exists
    const res = await client.query('SELECT id FROM users LIMIT 1');
    if (res.rowCount === 0) {
      await client.query('INSERT INTO users (name, total_xp, current_streak) VALUES ($1, $2, $3)', ['Estudiante Pro', 0, 0]);
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