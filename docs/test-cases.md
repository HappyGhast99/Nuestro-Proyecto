# Casos de Prueba Manuales

Este documento contiene las tablas de casos de prueba para el endpoint de creación de mascotas de la API, aplicando técnicas de Clases de Equivalencia (CE) y Análisis de Valores Límite (VL).

**Método:** `POST`  
**URL en Thunder Client:** `http://localhost:3000/api/usuarios/{usuarioId}/mascota`

> Reemplazar `{usuarioId}` por el ID del usuario (usuarios de prueba disponibles: 1 al 5).

---

## 1. Entidad: Mascotas

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
