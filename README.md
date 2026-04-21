# Nuestro Proyecto
# Problemática: 

Una gran problemática en el ámbito universitario es la gestión ineficiente del tiempo, lo que provoca procrastinación por parte de los estudiantes y un aumento en los niveles de estrés académico. Los estudiantes enfrentan una desconexión crítica entre la planificación y la ejecución diaria. Esta desorganización no solo compromete el rendimiento en evaluaciones, sino que también genera una sensación de parálisis frente a objetivos complejos.

# Solución del problema:

Nuestra propuesta consiste en una aplicación que automatiza la planificación diaria para que el estudiante no tenga que decidir qué hacer en cada momento. El software distribuye las tareas pendientes en un calendario inteligente, asignando bloques específicos tanto para el estudio como para el descanso necesario. 

Para asegurar que el usuario siga este plan, el sistema relaciona el progreso académico con la vida de una mascota virtual. Al cumplir con los objetivos establecidos, la mascota permanece saludable; pero si el usuario posterga sus deberes, esta mostrará signos de descuido y enviará alertas sobre su estado anímico. De este modo, se sustituye la presión tradicional por un sistema de cuidado y responsabilidad personal.

# Historias de usuarios epicas

| ID | Nombre | Issue |
| :--- | :--- | :--- |
| US - 01 | [Organización y estudio entretenido](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/13) | 1 |
| US - 02 | [Gestion de la atencion y enfoque](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/14) | 2 |
| US - 03 | [Motor de Inteligencia Predictiva y Autoconocimiento Temporal](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/15) | 3 |

# Historias de usuarios

| ID | Nombre | Issue |
| :--- | :--- | :--- |
| US - 01 | [Sistema de alertas visuales por semáforo de urgencia](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/2) | 1 |
| US - 02 | [Fragmentación de proyectos en subtareas](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/3) | 2 |
| US - 03 | [Modo de enfoque con restricción de interrupciones](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/4) | 3 |
| US - 04 | [Sistema de recompensa y racha diaria](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/5) | 4 |
| US - 05 | [Retroalimentación de estimación en tiempo real](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/6) | 5 |
| US - 06 | [Estado anímico vinculado al progreso](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/7) | 6 |
| US - 07 | [Sincronización de hitos académicos](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/8) | 7 |
| US - 08 | [Generación automática del plan semanal](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/9) | 8 |
| US - 09 | [Personalización de la mascota](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/10) | 9 |
| US - 10 | [Sistema de alertas emocionales (notificaciones)](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/11) | 10 |

# Diseño arquitectónico: 

[Ver Diseño arquitectónico](Arquitectura.md)

# Requisitos Extrafuncionales:

[Ver Requisitos Extrafuncionales](ReqExtrafuncionales.md)

# Entidades del dominio 

__Usuario:__ 
* id
* nombre 
* correo
* contraseña
* nivel_experiencia
* monedas_totales
* racha_actual

__Mascota:__
* id 
* nombre 
* especie 
* estado_salud
* nivel_animico
* nivel_afecto
* xp_mascota

__Ciclo de estudio:__
* id
* usuario_id
* titulo
* descripcion
* duracion_bloque
* estado
* fecha_entrega
* es_prioritaria
* recompensa_puntos

__Transaccion de monedas:__
* id
* usuario_id
* cantida
* fuente
* fecha

__Tienda de objetos:__
* id 
* nombre
* categoria 
* precio
* efecto

__Inventario:__
* id
* usuario_id
* item_id
* cantidad_disponible
* esta_equipada

__Racha:__
* id
* usuario_id
* conteo_dias
* ultima_fecha_actividad

<img width="2790" height="6762" alt="Usuario Management Framework-2026-04-20-165139" src="https://github.com/user-attachments/assets/2e7fed27-619b-44a8-9cce-32c5fe0dc87b" />


# Figma

[Focuspets](https://www.figma.com/design/Wo9LP4ZsXVFpqH7CqpHS1T/FocusPet-Home?node-id=0-1&p=f&t=JbesrMftXTk4cdNU-0)

# Integrantes de la organización:

| Integrantes | Rol | Ítems de la rúbrica a cargo |
| :--- | :--- | :--- |
| Antonia Bustamante Borquez | Product Owner | Historias de usuarios (epicas y normales), Diagrama de diseño arquitectonico,  Problematica y Solución |
| Joaquin Bustamante Ramirez | Developers | Historias de usuarios (epicas y normales), Entidades del dominio y Diagrama  |
| Fernanda Cerda Toledo | Developers | Historias de usuarios (epicas y normales), Figma, Repositorio, Requisitos Extrafuncionales |
| Martin Duran Salinas | Scrum master | Figma |
| Matthew Osorio Muñoz | Developers | Figma, diseño arquitectonico |
