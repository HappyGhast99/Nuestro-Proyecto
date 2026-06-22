## ADDED Requirements

### Requirement: Validación de entrada al crear y actualizar cursos
El sistema SHALL validar que todos los campos del curso sean correctos al crearlo o actualizarlo.

#### Scenario: Validación de campos vacíos
- **WHEN** se envía una petición POST o PUT a /cursos con el campo `nombre` o `instructor` vacío o ausente
- **THEN** la API responde con un código de estado 400 y un mensaje de error detallado.

#### Scenario: Validación de créditos positivos
- **WHEN** se envía una petición POST o PUT a /cursos con el campo `creditos` menor que 1 o de tipo no numérico/nulo
- **THEN** la API responde con un código de estado 400 y un mensaje de error detallado.

#### Scenario: Creación exitosa con datos correctos
- **WHEN** se envía una petición POST a /cursos con nombre no vacío, instructor no vacío y creditos mayor o igual a 1
- **THEN** la API responde con un código de estado 201 y el objeto del curso creado.
