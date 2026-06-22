# Casos de Prueba Manuales: Entidad Tarea

Este documento contiene los casos de prueba estructurados para validar el comportamiento del endpoint de creación de tareas (`POST /tareas`), aplicando las técnicas de **Clases de Equivalencia** y **Análisis de Valores Límite**.

---

## Clases de Equivalencia

| ID  | Método | URL | Técnica | Campo Evaluado | Descripción | Input JSON (Listo para Thunder Client) | HTTP Esperado | Resultado Real |
|-----|--------|-----|---------|----------------|-------------|----------------------------------------|---------------|----------------|
| P01 | `POST` | `http://localhost:3000/tareas` | CE      | General        | Todos los campos válidos | `{"titulo": "Física Mecánica", "descripcion": "Repasar cinemática", "recompensa": "Tomar un café", "duracion_bloque": 25, "proyecto_grande": false}` | **201** (Created) | |
| P02 | `POST` | `http://localhost:3000/tareas` | CE      | `titulo`       | Título vacío | `{"titulo": "", "recompensa": "Tomar un café", "duracion_bloque": 25}` | **400** (Bad Request) | |
| P03 | `POST` | `http://localhost:3000/tareas` | CE      | `titulo`       | Título con puros espacios | `{"titulo": "   ", "recompensa": "Tomar un café", "duracion_bloque": 25}` | **400** (Bad Request) | |
| P04 | `POST` | `http://localhost:3000/tareas` | CE      | `titulo`       | Título ausente | `{"recompensa": "Tomar un café", "duracion_bloque": 25}` | **400** (Bad Request) | |
| P05 | `POST` | `http://localhost:3000/tareas` | CE      | `recompensa`   | Recompensa vacía | `{"titulo": "Física Mecánica", "recompensa": "", "duracion_bloque": 25}` | **400** (Bad Request) | |
| P06 | `POST` | `http://localhost:3000/tareas` | CE      | `recompensa`   | Recompensa ausente | `{"titulo": "Física Mecánica", "duracion_bloque": 25}` | **400** (Bad Request) | |
| P07 | `POST` | `http://localhost:3000/tareas` | CE      | `duracion`     | Duración negativa | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": -10}` | **400** (Bad Request) | |
| P08 | `POST` | `http://localhost:3000/tareas` | CE      | `duracion`     | Duración como texto | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": "treinta"}` | **400** (Bad Request) | |
| P09 | `POST` | `http://localhost:3000/tareas` | CE      | `duracion`     | Duración como decimal | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": 25.5}` | **400** (Bad Request) | |
| P10 | `POST` | `http://localhost:3000/tareas` | CE      | `duracion`     | Duración ausente | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café"}` | **400** (Bad Request) | |

---

## Análisis de Valores Límite — Campo `duracion_bloque`

El límite inferior válido para la duración de una tarea es **1 minuto**.

| ID  | Método | URL | Técnica | Descripción | Input JSON (Listo para Thunder Client) | HTTP Esperado | Resultado Real |
|-----|--------|-----|---------|-------------|----------------------------------------|---------------|----------------|
| L01 | `POST` | `http://localhost:3000/tareas` | VL      | `duracion_bloque` = 1 (mínimo válido) | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": 1}` | **201** (Created) | |
| L02 | `POST` | `http://localhost:3000/tareas` | VL      | `duracion_bloque` = 0 (justo bajo el mínimo) | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": 0}` | **400** (Bad Request) | |
| L03 | `POST` | `http://localhost:3000/tareas` | VL      | `duracion_bloque` = -1 (bajo el límite inferior) | `{"titulo": "Física Mecánica", "recompensa": "Tomar un café", "duracion_bloque": -1}` | **400** (Bad Request) | |
