# Diseño Técnico: Selección Inicial de Mascota Virtual

Este diseño describe las decisiones técnicas y cambios en el código para implementar la selección inicial de la mascota.

## 1. Diseño de Base de Datos (SQLite)
* **Tabla `usuarios`:**
  ```sql
  CREATE TABLE IF NOT EXISTS usuarios (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email  TEXT NOT NULL UNIQUE
  );
  ```
* **Tabla `mascotas`:**
  ```sql
  CREATE TABLE IF NOT EXISTS mascotas (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id     INTEGER NOT NULL UNIQUE,
    nombre_mascota TEXT NOT NULL,
    tipo_mascota   TEXT NOT NULL,
    nivel          INTEGER NOT NULL DEFAULT 1,
    salud          INTEGER NOT NULL DEFAULT 100,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  );
  ```

## 2. Arquitectura en Capas (DoD)
* **Capa de Servicios (`services/mascota.service.js`):** Interacción directa con `db.js`.
* **Capa de Controladores (`controllers/mascota.controller.js`):** Validación de peticiones y respuestas HTTP.
* **Capa de Rutas (`routes/mascota.js`):** Definición de los endpoints.

## 3. Endpoints de la API
* `GET /api/usuarios/:usuarioId/mascota`:
  * `200 OK` si el usuario tiene mascota.
  * `404 Not Found` si el usuario no tiene mascota.
* `POST /api/usuarios/:usuarioId/mascota`:
  * `201 Created` al registrar la mascota.
  * `400 Bad Request` si los datos del cuerpo no son válidos (nombre vacío o tipo inválido), o si ya tiene mascota.

## 4. Frontend
* Se sirve una interfaz HTML/CSS/JS vanilla estática desde la carpeta `public/` expuesta por Express.
