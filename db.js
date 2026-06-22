const Database = require('better-sqlite3');
const db = new Database('datos.db');

// Habilitar soporte de claves foráneas
db.exec('PRAGMA foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS cursos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre     TEXT NOT NULL,
    instructor TEXT NOT NULL,
    creditos   INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tareas (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo          TEXT NOT NULL,
    descripcion     TEXT,
    recompensa      TEXT NOT NULL,
    duracion_bloque INTEGER NOT NULL,
    estado          TEXT DEFAULT 'pendiente'
  );

  CREATE TABLE IF NOT EXISTS subtareas (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    tarea_id    INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    estado      TEXT DEFAULT 'pendiente',
    FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS mini_logros (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT NOT NULL,
    fecha       TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;