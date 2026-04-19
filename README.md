# Nuestro-Proyecto
# Problematica: 

Una gran problemática en el ámbito universitario es la gestión ineficiente del tiempo, lo que provoca una procrastinación por parte de los estudiantes y un aumento en los niveles de estrés académico. Los estudiantes enfrentan una desconexión crítica entre la planificación y la ejecución diaria. Esta desorganización no solo compromete el rendimiento en evaluaciones, sino que genera una sensación de parálisis frente a objetivos complejos.

# Solucion del problema:

Nuestra propuesta consiste en una aplicación que automatiza la planificación diaria para que el estudiante no tenga que decidir qué hacer a cada momento. El software distribuye las tareas pendientes en un calendario inteligente, asignando bloques específicos tanto para el estudio como para el descanso necesario. Para asegurar que el usuario siga este plan, el sistema relaciona el progreso académico con la vida de una mascota virtual. Al cumplir con los objetivos establecidos, la mascota permanece saludable, pero si el usuario posterga sus deberes, esta mostrará signos de descuido y enviará alertas de su estado anímico. De este modo, se sustituye la presión tradicional por un sistema de cuidado y la responsabilidad personal.

# Historias de usuarios

| ID | Nombre | Issue |
| :--- | :--- | :--- |
| US - 01 | [La falta de urgencia](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/2) | 1) |
| US - 02 | [Sentirse abrumado (Micro tareas)](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/3) | 2) |
| US - 03 | [Distracciones y falta de concentración](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/4) | 3) |
| US - 04 | [La falta de recompensa inmediata](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/5) | 4) |
| US - 05 | [No medir bien el tiempo](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/6) | 5) |

# Diseño arquitectonico: 

Como equipo llegamos a la decision de optar por el diseño arquitectónico de __Micro-Servicios__, basandonos en las prioridades de nuestro proyecto y en nuestra visión sobre la funcion de la pagina/aplicación, ya que necesitamos de muchos procesos que tienen que funcionar a la vez, pero de manera independiente como:

* __Microservicio para Usuarios__: (BD) Debido que necesitamos los datos del usuario, como nombre, email, contraseña, etc.
* __Microservicio de Tareas/Calendario__: Necesitamos conectar con el calendario academico del estudiante, o con la agenda del usuario, lo cual se guardaria en la BD para enviar tareas y ajustar la aplicacion y mascota en base a sus ocupaciones.

* __Microservicio para Pagos/Suscripciones__: Esta seccion debe ser sobretodo la mas independiente al resto, para brindar seguridad a traves de una BD aislada de las demas, proteger especificamente esta informacion del usuario.

* __Microservicio para Notificaciones/Rachas__: Servicio en segundo plano para enviar avisos directos al usuario, al igual que actualizar las rachas diarias.

*  __Microservicio para Mascota Virtual__: Implementacion de IA, para mantener al usuario atento a rachas y notificaciones, al igual que implementar un sistema de recompensa, mini-juegos y demas, sin afectar los pagos y conjugandose con los demas servicios.


Esta estructura escogida es compleja de aplicar, pero apesar de eso, consideramos que es la mas indicada para nuestros ofrecimientos, al ser todo independiente podemos ordenarnos mejor con cada cambio, al igual que podemos correlacionar entre si aquellos microservicios, por lo que podemos hacer un trabajo independiente en cada uno, y a la vez que puedan combinarse entre ellos mismos.  

# Atributos:

[Atributos del proyectos](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/12)

# Figma

https://www.figma.com/design/Wo9LP4ZsXVFpqH7CqpHS1T/FocusPet-Home?node-id=0-1&m=dev&t=WDdg5RyzMNzE9ppz-1

# Integrantes de la organización:

| Integrantes | Rol | Items de la rubrica a cargo |
| :--- | :--- | :--- |
| Antonia Bustamante Borquez | Ver ubicación de salas | 1) |
| Joaquin Bustamante Ramirez | Ver capacidad de salas | 2) |
| Fernanda Cerda Toledo | Reservar sala rápidamente | 3) |
| Martin Duran Salinas | Cancelar reserva | 4) |
| Matthew Osorio Muñoz | Prioridad por facultad | 5) |

