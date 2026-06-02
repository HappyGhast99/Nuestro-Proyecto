const Database = require('better-sqlite3');
const db = new Database('datos.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS cursos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre     TEXT NOT NULL,
    instructor TEXT NOT NULL,
    creditos   INTEGER NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS actividades (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo        TEXT NOT NULL,
    fecha         TEXT NOT NULL,
    hora          TEXT NOT NULL,
    etiquetas     TEXT,
    posposiciones INTEGER DEFAULT 0
  )
`);

module.exports = db;