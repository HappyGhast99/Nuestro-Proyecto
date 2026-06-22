# Casos de Prueba Manuales

Este documento contiene las tablas de casos de prueba manuales para las entidades principales de la API, aplicando técnicas de Clases de Equivalencia (CE) y Análisis de Valores Límite (VL).

---

## 1. Entidad: Mascotas

Este endpoint permite la creación de mascotas asociadas a un usuario.

* **Método:** `POST`  
* **URL en Thunder Client:** `http://localhost:3000/api/usuarios/{usuarioId}/mascota`

> Reemplazar `{usuarioId}` por el ID del usuario (usuarios de prueba disponibles: 1 al 5).

### Clases de Equivalencia (POST /api/usuarios/:usuarioId/mascota)

| ID  | Técnica | Descripción                        | Input JSON                                                        | HTTP esp. | Resultado real                                                          |
|-----|---------|------------------------------------|-----------------------------------------------------------------  |-----------|-------------------------------------------------------------------------|
| P01 | CE      | Todos los campos válidos (Perro)   | `{"nombre_mascota":"Firulais","tipo_mascota":"Perro"}`             | 201       | 201 — `{"id":1,"usuario_id":1,"nombre_mascota":"Firulais","tipo_mascota":"Perro","nivel":1,"salud":100}` |
| P02 | CE      | Todos los campos válidos (Gato)    | `{"nombre_mascota":"Michi","tipo_mascota":"Gato"}`                 | 201       | 201 — `{"id":2,"usuario_id":2,"nombre_mascota":"Michi","tipo_mascota":"Gato","nivel":1,"salud":100}`     |
| P03 | CE      | Todos los campos válidos (Hámster) | `{"nombre_mascota":"Hammy","tipo_mascota":"Hámster"}`              | 201       | 201 — `{"id":3,"usuario_id":3,"nombre_mascota":"Hammy","tipo_mascota":"Hámster","nivel":1,"salud":100}`  |
| P04 | CE      | Nombre de mascota vacío            | `{"nombre_mascota":"","tipo_mascota":"Perro"}`                     | 400       | 400 — `{"error":"El nombre de la mascota no puede estar vacío"}`        |
| P05 | CE      | Nombre de mascota ausente          | `{"tipo_mascota":"Perro"}`                                         | 400       | 400 — `{"error":"El nombre de la mascota no puede estar vacío"}`        |
| P06 | CE      | Tipo de mascota inválido           | `{"nombre_mascota":"Rex","tipo_mascota":"Dragón"}`                 | 400       | 400 — `{"error":"El tipo de mascota debe ser uno de los siguientes: Perro, Gato, Hámster"}` |
| P07 | CE      | Tipo de mascota vacío              | `{"nombre_mascota":"Rex","tipo_mascota":""}`                       | 400       | 400 — `{"error":"El tipo de mascota debe ser uno de los siguientes: Perro, Gato, Hámster"}` |
| P08 | CE      | Tipo de mascota ausente            | `{"nombre_mascota":"Rex"}`                                         | 400       | 400 — `{"error":"El tipo de mascota debe ser uno de los siguientes: Perro, Gato, Hámster"}` |
| P09 | CE      | Usuario inexistente (id=999)       | `{"nombre_mascota":"Rex","tipo_mascota":"Perro"}`                  | 404       | 404 — `{"error":"Usuario no encontrado"}`                               |
| P10 | CE      | ID de usuario no numérico (abc)    | `{"nombre_mascota":"Rex","tipo_mascota":"Perro"}`                  | 400       | 400 — `{"error":"El ID de usuario debe ser un número entero válido"}`   |
| P11 | CE      | Usuario ya posee mascota           | `{"nombre_mascota":"Max","tipo_mascota":"Perro"}`                  | 400       | 400 — `{"error":"El usuario ya tiene una mascota asignada"}`            |

> **URLs para Thunder Client:**
>
> | Caso        | URL                                                      |
> |-------------|----------------------------------------------------------|
> | P01         | `http://localhost:3000/api/usuarios/1/mascota`            |
> | P02         | `http://localhost:3000/api/usuarios/2/mascota`            |
> | P03         | `http://localhost:3000/api/usuarios/3/mascota`            |
> | P04 — P08   | `http://localhost:3000/api/usuarios/4/mascota`            |
> | P09         | `http://localhost:3000/api/usuarios/999/mascota`          |
> | P10         | `http://localhost:3000/api/usuarios/abc/mascota`          |
> | P11         | `http://localhost:3000/api/usuarios/1/mascota` (después de P01) |

---

### Análisis de Valores Límite — campo nombre_mascota (POST /api/usuarios/:usuarioId/mascota)

| ID   | Técnica | Descripción                          | Input JSON                                                     | HTTP esp. | Resultado real                                                          |
|------|---------|--------------------------------------|----------------------------------------------------------------|-----------|-------------------------------------------------------------------------|
| L01  | VL      | nombre = 1 caracter (mínimo válido)  | `{"nombre_mascota":"F","tipo_mascota":"Perro"}`                 | 201       | 201 — `{"id":4,"usuario_id":5,"nombre_mascota":"F","tipo_mascota":"Perro","nivel":1,"salud":100}` |
| L02  | VL      | nombre vacío (longitud 0)            | `{"nombre_mascota":"","tipo_mascota":"Perro"}`                  | 400       | 400 — `{"error":"El nombre de la mascota no puede estar vacío"}`        |

> **URLs para Thunder Client:**
>
> | Caso | URL                                                      |
> |------|----------------------------------------------------------|
> | L01  | `http://localhost:3000/api/usuarios/5/mascota`            |
> | L02  | `http://localhost:3000/api/usuarios/5/mascota`            |
>
> Ejecutar L01 antes que L02. Si se necesita repetir, reiniciar la base de datos eliminando `datos.db`.

---

## 2. Entidad: Tareas

Este endpoint permite la creación de tareas con validaciones de recompensas e incentivos.

* **Método:** `POST`  
* **URL en Thunder Client:** `http://localhost:3000/tareas`

### Clases de Equivalencia (POST /tareas)

| ID  | Método | URL | Técnica | Campo Evaluado | Descripción | Input JSON (Listo para Thunder Client) | HTTP Esperado | Resultado Real |
|-----|--------|-----|---------|----------------|-------------|----------------------------------------|---------------|----------------|
| P01 | `POST` | `http://localhost:3000/tareas` | CE      | General        | Todos los campos válidos | `{"titulo": "Física Mecánica", "descripcion": "Repasar cinemática", "recompensa": "Tomar un café", "duracion_bloque": 25, "proyecto_grande": false}` | **201** (Created) | **201** (Created) |
| P02 | `POST` | `http://localhost:3000/tareas` | CE      | `titulo`       | Título vacío | `{"titulo": "", "recompensa": "Tomar un café", "duracion_bloque": 25}` | **400** (Bad Request) | **400** (Bad Request) |
| P03 | `POST` | `http://localhost:3000/tareas` | CE      | `titulo`       | Título con puros espacios | `{"titulo": "   ", "recompensa": "Tomar un café", "duracion_bloque": 25}` | **400** (Bad Request) | **400** (Bad Request) |
| P04 | `POST` | `http://localhost:3000/tareas` | CE      | `titulo`       | Título ausente | `{"recompensa": "Tomar un café", "duracion_bloque": 25}` | **400** (Bad Request) | **400** (Bad Request) |
| P05 | `POST` | `http://localhost:3000/tareas` | CE      | `recompensa`   | Recompensa vacía | `{"titulo": "Física Mecánica", "recompensa": "", "duracion_bloque": 25}` | **400** (Bad Request) | **400** (Bad Request) |
| P06 | `POST` | `http://localhost:3000/tareas` | CE      | `recompensa`   | Recompensa ausente | `{"titulo": "Física Mecánica", "duracion_bloque": 25}` | **400** (Bad Request) | **400** (Bad Request) |
| P07 | `POST` | `http://localhost:3000/tareas` | CE      | `duracion`     | Duración negativa | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": -10}` | **400** (Bad Request) | **400** (Bad Request) |
| P08 | `POST` | `http://localhost:3000/tareas` | CE      | `duracion`     | Duración como texto | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": "treinta"}` | **400** (Bad Request) | **400** (Bad Request) |
| P09 | `POST` | `http://localhost:3000/tareas` | CE      | `duracion`     | Duración como decimal | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": 25.5}` | **400** (Bad Request) | **400** (Bad Request) |
| P10 | `POST` | `http://localhost:3000/tareas` | CE      | `duracion`     | Duración ausente | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café"}` | **400** (Bad Request) | **400** (Bad Request) |

---

### Análisis de Valores Límite — Campo `duracion_bloque` (POST /tareas)

El límite inferior válido para la duración de una tarea es **1 minuto**.

| ID  | Método | URL | Técnica | Descripción | Input JSON (Listo para Thunder Client) | HTTP Esperado | Resultado Real |
|-----|--------|-----|---------|-------------|----------------------------------------|---------------|----------------|
| L01 | `POST` | `http://localhost:3000/tareas` | VL      | `duracion_bloque` = 1 (mínimo válido) | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": 1}` | **201** (Created) | **201** (Created) |
| L02 | `POST` | `http://localhost:3000/tareas` | VL      | `duracion_bloque` = 0 (justo bajo el mínimo) | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": 0}` | **400** (Bad Request) | **400** (Bad Request) |
| L03 | `POST` | `http://localhost:3000/tareas` | VL      | `duracion_bloque` = -1 (bajo el límite inferior) | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": -1}` | **400** (Bad Request) | **400** (Bad Request) |
