## 1. Base de Datos

- [x] 1.1 Modificar [db.js](file:///c:/Users/Tete/Desktop/SF%202/Nuestro-Proyecto/db.js) para definir y crear las tablas `tareas`, `subtareas` y `mini_logros` con sus respectivas claves foráneas e índices.

## 2. Endpoints de la API (Backend)

- [x] 2.1 Implementar endpoint `POST /arranque/completar` en [index.js](file:///c:/Users/Tete/Desktop/SF%202/Nuestro-Proyecto/index.js) para guardar un mini-logro al finalizar una sesión rápida.
- [x] 2.2 Implementar endpoint `GET /mini-logros` para listar todos los mini-logros acumulados por el usuario.
- [x] 2.3 Implementar endpoint `POST /tareas` para crear una nueva tarea con validación del campo `recompensa` y `duracion_bloque` obligatorios.
- [x] 2.4 Implementar endpoint `PUT /tareas/:id/completar` que actualiza el estado de la tarea y retorna la recompensa asociada.
- [x] 2.5 Implementar endpoint `POST /tareas/:id/desglosar` que genera automáticamente un checklist inicial de 3 a 5 subtareas.
- [x] 2.6 Implementar endpoint `PUT /subtareas/:id/estado` para actualizar estado y entregar un incentivo por iniciar la primera subtarea de la lista.

## 3. Pruebas y Validación

- [x] 3.1 Crear un archivo de prueba en [scratch/](file:///C:/Users/Tete/.gemini/antigravity-ide/brain/0ec3980f-a432-4ab4-b841-55827b181003/scratch/) para simular requests HTTP (POST, GET, PUT) contra los nuevos endpoints y comprobar el flujo completo.
- [x] 3.2 Validar que se cumple la Definition of Done y no existen errores críticos asociados.
