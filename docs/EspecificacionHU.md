# Especificación de Historia de Usuario

## US-09: Selección Inicial y Personalización de Mascota Virtual
Como estudiante, quiero elegir y nombrar a mi mascota virtual al iniciar la aplicación, para generar un vínculo de pertenencia y responsabilidad único.

## Criterios de aceptación
- CA1: El sistema debe permitir elegir entre al menos tres tipos de mascotas (Perro, Gato, Hámster).
- CA2: El sistema debe permitir asignar un nombre personalizado a la mascota seleccionada.
- CA3: La mascota creada debe quedar asociada a la cuenta del usuario de manera persistente.

## Definition of Done (criterios que garsntizan que se ha desarrollado bien, como uso de PR, revisión de code smells, etc)
1. La lógica de negocio queda separada en `routes/`, `controllers/` y `services/`, cada capa con una sola responsabilidad.
2. El frontend es HTML + fetch vanilla, sin frameworks, servido por el mismo servidor Express.
3. La API responde con códigos HTTP semánticamente correctos: 201 al crear, 400 para datos inválidos, 404 si no existe, 500 para errores del servidor.
4. No existen errores críticos relacionados con la funcionalidad.
5. Funcionalidad comprobada previamente por el equipo.
6. Cumplimiento de todos los criterios de aceptación.

Nota: esto sólo para la historia que se implementará, independiente de los issues en github.
