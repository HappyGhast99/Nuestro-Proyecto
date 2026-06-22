# Propuesta de Cambio: Selección Inicial de Mascota Virtual

## Descripción
Esta propuesta añade la funcionalidad de selección inicial de mascota para el usuario de FocusPets. Al entrar a la aplicación por primera vez, el usuario podrá elegir entre tres tipos de mascota virtual (Perro, Gato o Hámster) y asignarle un nombre personalizado.

## Alcance
- **Base de Datos:** Incorporación de tablas de usuarios y mascotas.
- **Backend:** Endpoints API para obtener mascota de usuario (`GET`) y crear una nueva mascota (`POST`) con arquitectura limpia en capas (`routes`, `controllers`, `services`).
- **Frontend:** Vista de selección inicial si el usuario no tiene mascota, y Dashboard de la mascota si ya tiene una mascota configurada.
