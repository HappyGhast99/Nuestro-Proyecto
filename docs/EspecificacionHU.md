# Especificación de Historia de Usuario
 
## US-02: Incentivos y Sistema de Arranque para Gestión de Tareas Académicas
Como **estudiante universitario**, quiero **disponer de un sistema de temporizadores cortos, recompensas autodefinidas y desglose automático de proyectos**, para **reducir la procrastinación, superar la fricción inicial al estudiar y mantener la motivación**.
 
## Criterios de aceptación
- **CA1 (Modo Arranque - Reducción de fricción inicial)**: Cuando el usuario tenga una tarea compleja o pesada pendiente y presione el botón de "Iniciar sesión rápida", el sistema debe activar un temporizador corto (de solo 5 o 10 minutos). Al finalizar, el sistema debe registrar y otorgar un "mini-logro" (ej. *“Superada la inercia inicial: Sesión de 5 minutos completada”*) para premiar el inicio de la actividad.
- **CA2 (Sistema de recompensas autodefinidas)**: Al crear una nueva tarea, los campos de "título", "recompensa al finalizar" (ej. *“Tomar un Nespresso”*) y "duración del bloque" son obligatorios. Al finalizar el temporizador de la tarea, se debe desplegar un modal interactivo a pantalla completa para reclamar la recompensa configurada.
- **CA3 (Desglose automático de proyectos)**: Si el usuario indica que la tarea es un "proyecto grande" (marcando el checkbox correspondiente en el formulario), el sistema debe desglosar automáticamente la tarea creando 3 subtareas secuenciales recomendadas basadas en el título (ej. *“Preparar material”*, *“Desarrollar núcleo principal”* y *“Revisar y finalizar”*).
- **CA4 (Incentivo del primer paso)**: Cuando el usuario complete la primera subtarea de una tarea desglosada, el sistema debe detectar que es el primer paso y entregar un incentivo visual extra en pantalla (toast de motivación) para incentivar la continuidad de la sesión de estudio.
- **CA5 (Persistencia de datos y limpieza)**: Todas las tareas, subtareas y mini-logros deben persistir en la base de datos SQLite. Al completar la tarea principal, el usuario debe tener la opción de eliminar la tarea completada del panel para mantener limpia su vista de seguimiento.
 
## Definition of Done (Criterios de Aceptación Técnicos)
1. **Implementación de Base de Datos**: Las tablas `tareas`, `subtareas` y `mini_logros` están definidas en SQLite (`datos.db`) con sus relaciones y llaves foráneas habilitadas (`PRAGMA foreign_keys = ON`).
2. **Validación de Endpoints**: Todos los endpoints desarrollados (`POST /tareas`, `PUT /subtareas/:id/estado`, `POST /arranque/completar`, etc.) deben validar los datos requeridos y responder con códigos HTTP correctos (`201 Created` para éxito, `400 Bad Request` en caso de inputs vacíos, nulos o negativos).
3. **Casos de Prueba Ejecutados**: El 100% de los casos de prueba definidos mediante Clases de Equivalencia (CE) y Análisis de Valores Límite (VL) han sido probados y validados manualmente con resultados reales documentados.
4. **Documentación de API**: Todos los endpoints de la nueva funcionalidad deben estar anotados con tags `@swagger` y disponibles para interactuar en la UI de Swagger en `/docs`.
5. **Control de Versiones y Integración**: Los cambios deben estar libres de conflictos con la rama base (`main`), aprobados en un Pull Request, y el cambio activo debe archivarse a través del ciclo de vida de OpenSpec.
