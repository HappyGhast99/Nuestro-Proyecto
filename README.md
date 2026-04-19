# Nuestro-Proyecto
# Problemática: 

Una gran problemática en el ámbito universitario es la gestión ineficiente del tiempo, lo que provoca procrastinación por parte de los estudiantes y un aumento en los niveles de estrés académico. Los estudiantes enfrentan una desconexión crítica entre la planificación y la ejecución diaria. Esta desorganización no solo compromete el rendimiento en evaluaciones, sino que también genera una sensación de parálisis frente a objetivos complejos.

# Solución del problema:

Nuestra propuesta consiste en una aplicación que automatiza la planificación diaria para que el estudiante no tenga que decidir qué hacer en cada momento. El software distribuye las tareas pendientes en un calendario inteligente, asignando bloques específicos tanto para el estudio como para el descanso necesario. 

Para asegurar que el usuario siga este plan, el sistema relaciona el progreso académico con la vida de una mascota virtual. Al cumplir con los objetivos establecidos, la mascota permanece saludable; pero si el usuario posterga sus deberes, esta mostrará signos de descuido y enviará alertas sobre su estado anímico. De este modo, se sustituye la presión tradicional por un sistema de cuidado y responsabilidad personal.

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

Como equipo, llegamos a la decisión de optar por el diseño arquitectónico de __Microservicios__, basándonos en las prioridades de nuestro proyecto y en nuestra visión sobre la función de la página/aplicación, ya que necesitamos muchos procesos que deben funcionar a la vez, pero de manera independiente, como:

* __Microservicio para Usuarios (BD)__: Debido a que necesitamos los datos del usuario, como nombre, email, contraseña, etc.

* __Microservicio de Tareas/Calendario__: Necesitamos conectar con el calendario académico del estudiante o con la agenda del usuario, lo cual se guardaría en la BD para enviar tareas y ajustar la aplicación y la mascota en base a sus ocupaciones.

* __Microservicio para Pagos/Suscripciones__: Esta sección debe ser, sobre todo, la más independiente del resto, para brindar seguridad a través de una BD aislada de las demás y proteger específicamente esta información del usuario.

* __Microservicio para Notificaciones/Rachas__: Servicio en segundo plano para enviar avisos directos al usuario, al igual que actualizar las rachas diarias.

* __Microservicio para Mascota Virtual__: Implementación de IA para mantener al usuario atento a rachas y notificaciones, además de implementar un sistema de recompensa, minijuegos y demás, sin afectar los pagos y conjugándose con los demás servicios.

Esta estructura escogida es compleja de aplicar, pero, a pesar de eso, consideramos que es la más indicada para nuestros objetivos. Al ser todo independiente, podemos organizarnos mejor con cada cambio, así como correlacionar entre sí aquellos microservicios. De esta forma, podemos trabajar de manera independiente en cada uno y, al mismo tiempo, lograr que se integren entre ellos.

# Atributos:

[Atributos del proyecto](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/12)

# Figma

https://www.figma.com/design/Wo9LP4ZsXVFpqH7CqpHS1T/FocusPet-Home?node-id=0-1&m=dev&t=WDdg5RyzMNzE9ppz-1

# Integrantes de la organización:

| Integrantes | Rol | Ítems de la rúbrica a cargo |
| :--- | :--- | :--- |
| Antonia Bustamante Borquez |  |  |
| Joaquin Bustamante Ramirez |  |  |
| Fernanda Cerda Toledo |  |  |
| Martin Duran Salinas |  |  |
| Matthew Osorio Muñoz |  |  |
