## Context

Los endpoints de cursos (`POST /cursos` y `PUT /cursos/:id`) procesan y persisten peticiones sin validación previa. El diseño agregará validaciones directamente en el controlador de rutas del archivo `index.js` antes de interactuar con la base de datos de SQLite.

## Goals / Non-Goals

**Goals:**
- Validar la existencia y formato correcto de los campos `nombre` (string no vacío), `instructor` (string no vacío) y `creditos` (entero >= 1) en las peticiones de creación y modificación de cursos.
- Retornar respuestas estructuradas con código 400 detallando el error encontrado.

**Non-Goals:**
- No se refactorizará el código de cursos a una estructura de carpetas/controladores separada en esta etapa para evitar complejidad y cumplir estrictamente con resolver el defecto detectado de la forma más directa posible.
- No se alterarán los tipos ni la estructura de la base de datos de SQLite actual.

## Decisions

- **Validación inline en los controladores de Express (`index.js`):** Dado que la lógica de cursos está concentrada en `index.js` y no se requiere lógica compleja de negocio para la validación, agregaremos condicionales sencillos de comprobación en los handlers de ruta del servidor Express.
- **Formato del cuerpo de respuesta:** Las respuestas de error seguirán el formato `{ error: "Mensaje descriptivo del error" }` para ser coherentes con el estándar utilizado en el resto de la aplicación.

## Risks / Trade-offs

- **Duplicación de código de validación:** Tanto el POST como el PUT compartirán lógica de validación similar para la creación/modificación de cursos. Dado que solo son dos rutas, una función auxiliar simple de validación `validarCurso(req, res, next)` o bloques de validación local serán suficientes y mantendrán la simplicidad.
