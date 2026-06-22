# desglose-subtareas Specification

## Purpose
TBD - created by archiving change incentivos-inicio-tareas. Update Purpose after archive.
## Requirements
### Requirement: Desglose Automático de Tareas Grandes
Cuando el usuario guarda un proyecto o tarea de gran tamaño en el sistema, el sistema SHALL sugerir o permitir dividir dicho proyecto en 3 a 5 subtareas más pequeñas.

#### Scenario: Sugerencia de desglose al crear un proyecto grande
- **WHEN** el usuario registra una tarea marcada como proyecto o con alta prioridad/duración
- **THEN** el sistema genera automáticamente de 3 a 5 subtareas recomendadas o permite al usuario crearlas directamente como un checklist.

### Requirement: Incentivo por Inicio de Primera Subtarea
El sistema SHALL otorgar una recompensa o incentivo independiente al usuario tan pronto como inicie o complete la primera subtarea del desglose, reforzando el primer paso.

#### Scenario: Recompensa al iniciar la primera subtarea
- **WHEN** el usuario inicia el trabajo o completa la primera subtarea de la lista desglosada
- **THEN** el sistema registra y otorga un incentivo o beneficio directo para incentivar la acción inicial.

