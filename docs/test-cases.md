# Casos de Prueba Manuales

Este documento contiene las tablas de casos de prueba para los endpoints de creación y modificación de la API, aplicando técnicas de Clases de Equivalencia (CE) y Análisis de Valores Límite (VL).

---

## 1. Entidad: Cursos

### Clases de Equivalencia (POST /cursos)

| ID  | Técnica | Descripción                  | Input JSON                                                      | HTTP esp. | Resultado real |
|-----|---------|------------------------------|-----------------------------------------------------------------|-----------|----------------|
| C01 | CE      | Todos los campos válidos     | {"nombre":"Cálculo","instructor":"Dr. Ruiz","creditos":4}        | 201       | 201            |
| C02 | CE      | Nombre vacío                 | {"nombre":"","instructor":"Dr. Ruiz","creditos":4}              | 400       | 201 (Defecto)  |
| C03 | CE      | Nombre ausente               | {"instructor":"Dr. Ruiz","creditos":4}                          | 400       | 500 (Defecto)  |
| C04 | CE      | Instructor vacío             | {"nombre":"Cálculo","instructor":"","creditos":4}               | 400       | 201 (Defecto)  |
| C05 | CE      | Créditos negativos           | {"nombre":"Cálculo","instructor":"Dr. Ruiz","creditos":-1}      | 400       | 201 (Defecto)  |
| C06 | CE      | Créditos como texto          | {"nombre":"Cálculo","instructor":"Dr. Ruiz","creditos":"cuatro"}| 400       | 201 (Defecto)  |
| C07 | CE      | Créditos nulos               | {"nombre":"Cálculo","instructor":"Dr. Ruiz","creditos":null}    | 400       | 500 (Defecto)  |

### Análisis de Valores Límite — campo creditos (POST /cursos)

| ID  | Técnica | Descripción                     | Input JSON                                                    | HTTP esp. | Resultado real |
|-----|---------|----------------------------------|---------------------------------------------------------------|-----------|----------------|
| CL01| VL      | creditos = 1 (mínimo válido)     | {"nombre":"Cálculo","instructor":"Dr. Ruiz","creditos":1}     | 201       | 201            |
| CL02| VL      | creditos = 0 (justo bajo mínimo) | {"nombre":"Cálculo","instructor":"Dr. Ruiz","creditos":0}     | 400       | 201 (Defecto)  |
| CL03| VL      | creditos = -1 (bajo el límite)   | {"nombre":"Cálculo","instructor":"Dr. Ruiz","creditos":-1}    | 400       | 201 (Defecto)  |

---

## 2. Entidad: Mascotas

### Clases de Equivalencia (POST /api/usuarios/:usuarioId/mascota)

| ID  | Técnica | Descripción                  | Input JSON                                                      | HTTP esp. | Resultado real |
|-----|---------|------------------------------|-----------------------------------------------------------------|-----------|----------------|
| M01 | CE      | Mascota válida (Perro)       | {"nombre_mascota":"Firulais","tipo_mascota":"Perro"}            | 201       | 201            |
| M02 | CE      | Mascota válida (Gato)        | {"nombre_mascota":"Michi","tipo_mascota":"Gato"}                | 201       | 201            |
| M03 | CE      | Mascota válida (Hámster)     | {"nombre_mascota":"Hammy","tipo_mascota":"Hámster"}             | 201       | 201            |
| M04 | CE      | Nombre de mascota vacío      | {"nombre_mascota":"","tipo_mascota":"Perro"}                    | 400       | 400            |
| M05 | CE      | Nombre de mascota ausente    | {"tipo_mascota":"Perro"}                                        | 400       | 400            |
| M06 | CE      | Tipo de mascota inválido     | {"nombre_mascota":"Rex","tipo_mascota":"Dragón"}                | 400       | 400            |
| M07 | CE      | Tipo de mascota vacío        | {"nombre_mascota":"Rex","tipo_mascota":""}                      | 400       | 400            |
| M08 | CE      | Tipo de mascota ausente      | {"nombre_mascota":"Rex"}                                        | 400       | 400            |

### Análisis de Valores Límite — campo nombre_mascota (POST /api/usuarios/:usuarioId/mascota)

| ID  | Técnica | Descripción                     | Input JSON                                                    | HTTP esp. | Resultado real |
|-----|---------|----------------------------------|---------------------------------------------------------------|-----------|----------------|
| ML01| VL      | nombre = 1 caracter (mínimo)     | {"nombre_mascota":"F","tipo_mascota":"Perro"}                 | 201       | 201            |
| ML02| VL      | nombre vacío (longitud 0)        | {"nombre_mascota":"","tipo_mascota":"Perro"}                  | 400       | 400            |
