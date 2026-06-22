# Especificación: Selección Inicial y Personalización de Mascota Virtual

Como estudiante, quiero elegir y nombrar a mi mascota virtual al iniciar la aplicación, para generar un vínculo de pertenencia y responsabilidad único.

## Escenarios

### Escenario 1: Selección inicial
- **Dado** que es la primera vez que abro la aplicación.
- **Cuando** accedo a mi cuenta creada.
- **Entonces** el sistema debe permitirme elegir entre al menos tres tipos de mascotas y asignarles un nombre personalizado.

## Definition of Done (DoD)

- El usuario puede ingresar sin problemas a la personalización y creación de su mascota virtual.
- El usuario puede seleccionar su tipo de mascota.
- El usuario le puede asignar un nombre personalizado a su mascota virtual.
- La mascota debe quedar asociada a la cuenta del usuario correctamente.
- No existen errores críticos relacionados con la funcionalidad.
- Funcionalidad comprobada previamente por el equipo.
- Cumplimiento de todos los criterios de aceptación.
- La lógica de negocio queda separada en `routes/`, `controllers/` y `services/`, cada capa con una sola responsabilidad.
- El frontend es HTML + fetch vanilla, sin frameworks, servido por el mismo servidor Express.
- La API responde con códigos HTTP semánticamente correctos: 201 al crear, 400 para datos inválidos, 404 si no existe, 500 para errores del servidor.
