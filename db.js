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

  CREATE TABLE IF NOT EXISTS usuarios (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email  TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS mascotas (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id     INTEGER NOT NULL UNIQUE,
    nombre_mascota TEXT NOT NULL,
    tipo_mascota   TEXT NOT NULL,
    nivel          INTEGER NOT NULL DEFAULT 1,
    salud          INTEGER NOT NULL DEFAULT 100,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  );
`);

// Insertar 5 usuarios de prueba si la tabla está vacía
const row = db.prepare('SELECT COUNT(*) as count FROM usuarios').get();
if (row.count === 0) {
  const insertUser = db.prepare('INSERT INTO usuarios (id, nombre, email) VALUES (?, ?, ?)');
  insertUser.run(1, 'Antonia B.', 'antonia@focuspets.com');
  insertUser.run(2, 'Joaquín B.', 'joaquin@focuspets.com');
  insertUser.run(3, 'Fernanda C.', 'fernanda@focuspets.com');
  insertUser.run(4, 'Martín D.', 'martin@focuspets.com');
  insertUser.run(5, 'Matthew O.', 'matthew@focuspets.com');
}

module.exports = db;
