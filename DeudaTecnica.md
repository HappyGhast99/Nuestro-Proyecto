# Deuda Técnica, Code Smells y Mejoras de Diseño

## Code smells / deuda técnica identificada

| ID    | Ubicación (archivo/módulo) | Descripción del problema | Propuesta de mejora |
|-------|----------------------------|--------------------------|---------------------|
| DT-01 | [index.js](file:///c:/Users/Durans/Desktop/U/clone%20rep/Nuestro-Proyecto/index.js#L37-L123) | **Falta de arquitectura en capas para cursos:** Las rutas, controladores y consultas directas a la base de datos de la entidad `cursos` se encuentran mezcladas directamente en el punto de entrada principal (`index.js`), lo que rompe la arquitectura limpia en capas del proyecto. | Extraer las rutas, controladores y lógica de base de datos de cursos hacia `routes/cursos.js`, `controllers/cursos.controller.js` y `services/cursos.service.js` respectivamente, siguiendo el patrón de diseño implementado para las mascotas. |
| DT-02 | [db.js](file:///c:/Users/Durans/Desktop/U/clone%20rep/Nuestro-Proyecto/db.js) | **Acoplamiento de esquema y datos de prueba:** La definición del esquema de base de datos (`CREATE TABLE`) y la inserción de registros de prueba (seeds) se encuentran acoplados dentro de la conexión a la base de datos (`db.js`), ejecutándose en cada inicio de la aplicación. | Separar la inicialización y el seeding de la base de datos a un script independiente (por ejemplo, `init-db.js` o un archivo de migraciones), dejando a `db.js` únicamente la responsabilidad de inicializar y exportar la conexión a la base de datos. |
| DT-03 | [controllers/mascota.controller.js](file:///c:/Users/Durans/Desktop/U/clone%20rep/Nuestro-Proyecto/controllers/mascota.controller.js) | **Validación de parámetros duplicada:** Validación repetitiva de `usuarioId` (parseo, verificación de tipo y existencia del usuario en la base de datos) en múltiples controladores (`obtenerMascota`, `registrarMascota`, `eliminarMascota`). | Implementar un middleware de express para la validación de `usuarioId` (por ejemplo, `validarUsuarioExistente`) de manera que las rutas verifiquen previamente la existencia del usuario y adjunten su información a `req.usuario` antes de ejecutar la lógica del controlador. |

## Mejoras de diseño futuras

- [Mejora 1: Migración a ORM/Query Builder (Prisma o Knex) para independizar el motor de base de datos, facilitar sanitización y evitar consultas SQL puras y repetitivas]
- [Mejora 2: Implementación de un manejador de errores centralizado (Global Error Handler) en Express para eliminar la redundancia de bloques try/catch en cada controlador]
- [Mejora 3: Configuración dinámica mediante variables de entorno (dotenv) para desacoplar el puerto (3000) y la ruta del archivo de base de datos (datos.db)]
