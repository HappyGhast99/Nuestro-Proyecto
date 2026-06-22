## Why

Este cambio aborda la procrastinación en estudiantes universitarios incentivando tanto el inicio como la finalización de tareas académicas. Mediante la reducción de la fricción inicial (Modo Arranque con temporizadores cortos), recompensas personalizadas visibles al terminar, y la fragmentación automática de tareas complejas en subtareas, se motiva a los usuarios a dar el primer paso y a mantener la constancia.

## What Changes

- **Modo Arranque (Inicio Rápido)**: Adición de un botón funcional de "Iniciar sesión rápida" que activa un temporizador de 5 o 10 minutos, entregando un mini-logro al finalizar para romper la inercia inicial.
- **Recompensas Autodefinidas**: Incorporación de un campo "Recompensa al finalizar" en el flujo de creación/configuración de tareas y bloques de estudio. Al finalizar el temporizador, esta recompensa se muestra a pantalla completa (solo si se cumple la meta establecida).
- **Desglose Automático de Tareas**: Capacidad de sugerir o permitir dividir un proyecto grande en 3 a 5 subtareas más pequeñas de forma automática, otorgando un incentivo independiente al iniciar la primera subtarea.
- **Base de Datos y API**: Creación y actualización de tablas y endpoints HTTP necesarios para guardar recompensas, subtareas y registrar la compleción de metas.

## Capabilities

### New Capabilities

- `modo-arranque`: Capacidad de iniciar un temporizador de sesión rápida (5 o 10 minutos) que premia al usuario con un mini-logro al terminar y reduce la fricción inicial.
- `recompensas-autodefinidas`: Gestión de campos de recompensa personalizada por tarea y presentación de pantalla completa interactiva al cumplir una meta.
- `desglose-subtareas`: Lógica y endpoints para la fragmentación de tareas grandes en 3-5 subtareas independientes y el registro del incentivo de inicio rápido.

### Modified Capabilities

*(Ninguna capacidad existente requiere cambio en sus especificaciones base actuales)*

## Impact

- **Base de Datos (`datos.db`)**: Modificación del esquema para añadir la tabla de `subtareas` (con estado `pendiente` / `completada` y enlace a `tarea_id`) y actualizar la tabla de tareas/cursos para incluir campos como `recompensa_final` o `duracion_bloque`.
- **Backend ([index.js](file:///c:/Users/Tete/Desktop/SF%202/Nuestro-Proyecto/index.js))**: Nuevas rutas HTTP (`/subtareas`, `/tareas`, `/recompensas`, `/temporizadores`) para dar soporte a las nuevas características de negocio.
- **Frontend / Cliente**: Requiere pantallas e interfaces de usuario para:
  - Formulario de creación con campo de recompensa.
  - Temporizador visible del Modo Arranque.
  - Vista de pantalla completa para celebrar y mostrar la recompensa obtenida.
  - Botón de "Iniciar sesión rápida".
