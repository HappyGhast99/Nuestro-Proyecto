## Why

Los endpoints de creación (`POST /cursos`) y modificación (`PUT /cursos/:id`) de la API de cursos carecen de validaciones en los campos de entrada, permitiendo el ingreso de datos nulos, vacíos o créditos negativos. Esto genera inconsistencia de datos y errores imprevistos.

## What Changes

- Validación estricta para asegurar que el `nombre` e `instructor` del curso sean cadenas de texto no vacías.
- Validación para asegurar que los `creditos` del curso sean un número entero positivo mayor o igual a 1.
- Retorno de código de estado HTTP `400 Bad Request` ante entradas inválidas.

## Capabilities

### New Capabilities
- `gestion-cursos`: Especificación de creación, listado, actualización y eliminación de cursos con validación de datos.

### Modified Capabilities
<!-- No modificamos especificaciones existentes, creamos una nueva de gestión de cursos. -->
