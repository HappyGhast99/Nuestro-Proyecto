## ADDED Requirements

### Requirement: Recompensas Autodefinidas por Tarea
Al crear o configurar una tarea, el sistema SHALL requerir o sugerir un campo de "Recompensa al finalizar" (por ejemplo: "Tomar un Nespresso").

#### Scenario: Configuración de recompensa al crear tarea
- **WHEN** el usuario ingresa los datos de una nueva tarea y rellena el campo "Recompensa al finalizar"
- **THEN** el sistema guarda la tarea con la recompensa asociada en la base de datos.

### Requirement: Pantalla Completa de Recompensa al Finalizar
Al terminar con éxito el temporizador asociado a una tarea con recompensa configurada, el sistema SHALL desplegar un mensaje o felicitación interactiva a pantalla completa mostrando la recompensa autodefinida.

#### Scenario: Visualización de recompensa al cumplir la meta
- **WHEN** el temporizador de la tarea finaliza correctamente completando la meta establecida
- **THEN** el sistema despliega en pantalla completa el mensaje con la recompensa autodefinida (ej. "¡Bien hecho! Ahora puedes: Tomar un Nespresso").
