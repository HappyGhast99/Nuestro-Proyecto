## Context

El objetivo de este diseño técnico es incorporar mecanismos de motivación y reducción de procrastinación a la API actual de cursos/actividades, de acuerdo a la Historia de Usuario especificada. Se requiere dar soporte al Modo Arranque (temporizadores cortos con mini-logros), el manejo de Recompensas Autodefinidas a pantalla completa, y el Desglose Automático de tareas en subtareas con premios independientes al dar el primer paso.

## Goals / Non-Goals

**Goals:**
- Implementar la persistencia de tareas y subtareas en SQLite (`datos.db`).
- Crear endpoints para iniciar y completar sesiones rápidas (Modo Arranque) registrando mini-logros.
- Agregar soporte para guardar y recuperar una "recompensa autodefinida" para cada tarea.
- Proveer lógica para desglosar tareas grandes en 3 a 5 subtareas de forma automática o sugerida.
- Diseñar la lógica del primer incentivo al completar la primera subtarea.

**Non-Goals:**
- No se implementará un temporizador visual en tiempo real en el backend (esta lógica de cuenta regresiva corresponde enteramente al frontend/cliente web).
- No se integrará con APIs externas de notificaciones o de correo en esta fase.

## Decisions

### 1. Modelo de Datos en SQLite
Añadir soporte de tablas para `tareas`, `subtareas` y `mini_logros` en `datos.db` a través de [db.js](file:///c:/Users/Tete/Desktop/SF%202/Nuestro-Proyecto/db.js).

```sql
CREATE TABLE IF NOT EXISTS tareas (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo          TEXT NOT NULL,
  descripcion     TEXT,
  recompensa      TEXT NOT NULL,
  duracion_bloque INTEGER NOT NULL, -- en minutos (e.g. 25, 5 o 10 para modo arranque)
  estado          TEXT DEFAULT 'pendiente' -- 'pendiente', 'completada'
);

CREATE TABLE IF NOT EXISTS subtareas (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tarea_id    INTEGER NOT NULL,
  descripcion TEXT NOT NULL,
  estado      TEXT DEFAULT 'pendiente', -- 'pendiente', 'completada'
  FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mini_logros (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  descripcion TEXT NOT NULL,
  fecha       TEXT DEFAULT CURRENT_TIMESTAMP
);
```

*Alternativa considerada*: Usar la tabla `actividades` existente. Se descarta porque `actividades` no posee campos para recompensa ni la relación de subtareas, y crear tablas específicas para `tareas` simplifica la lógica y la mantiene limpia.

### 2. Endpoints de la API en index.js

#### A. Modo Arranque
- **POST `/arranque/completar`**: Se llama cuando el temporizador de 5 o 10 minutos termina. Inserta un registro en `mini_logros` y responde con el logro otorgado.
  - *Payload*: `{ "duracion": 5 }` o `{ "duracion": 10 }`
  - *Response*: `{ "mensaje": "Mini-logro otorgado", "logro": "Superada la inercia inicial: Sesión de 5 minutos completada" }`

#### B. Recompensas Autodefinidas
- **POST `/tareas`**: Crea una nueva tarea requiriendo el campo `recompensa` y `duracion_bloque`.
  - *Payload*: `{ "titulo": "Estudiar Álgebra", "recompensa": "Tomar un Nespresso", "duracion_bloque": 30 }`
- **PUT `/tareas/:id/completar`**: Completa la tarea y devuelve la recompensa autodefinida.
  - *Response*: `{ "mensaje": "Tarea completada con éxito", "recompensa": "Tomar un Nespresso" }`

#### C. Desglose de Subtareas
- **POST `/tareas/:id/desglosar`**: Genera automáticamente 3 subtareas recomendadas basadas en el título del proyecto.
  - *Response*: `{ "tarea_id": 1, "subtareas": [...] }`
- **PUT `/subtareas/:id/estado`**: Cambia el estado de una subtarea. Si es la primera subtarea de la tarea que pasa a `completada`, el sistema retorna un incentivo adicional.
  - *Payload*: `{ "estado": "completada" }`
  - *Response*: `{ "mensaje": "Subtarea completada", "primer_paso_recompensado": true/false }`

## Risks / Trade-offs

- **[Riesgo]**: El temporizador en el cliente se refresca o cierra accidentalmente, perdiendo el progreso.
  - *Mitigación*: El frontend deberá guardar el estado del temporizador activo en `localStorage` o pedir confirmación para salir.
- **[Riesgo]**: Completar subtareas repetidamente para "farmear" incentivos de primer paso.
  - *Mitigación*: La recompensa del primer paso solo se otorgará una única vez por tarea, marcando una bandera en la base de datos o contando las subtareas ya completadas de esa tarea específica.
