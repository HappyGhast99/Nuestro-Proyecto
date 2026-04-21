# Sumativa 1

# Cambio solicitado:

Se nos pidio optimizar el tiempo de respuesta de los microservicios con una respuesta menor a un segundo y tambien generar dependencias entre los modulos. 

Para la resolución del problema se nos ocurrieron dos formas de actuar, una añadiendo un nuevo modulo (modulo extra) para crear una dependencia entre ellos y la segunda es unificar los módulos y redireccionarlos a una misma base de datos, terminamos eligiendo la segunda opción ya que requiere menor gasto al no tener que agregar ningún modulo extra  y solo tener que optimizar lo que ya tenemos para así lograr el tiempo de espera deseado.

Nuestra solución es unificar los módulos, se nos pidió resumidamente la optimización de tiempo de respuesta en gamificación, calendario, tareas, originalmente comenzamos utilizando una arquitectura de micro servicios cada uno con una base de datos independiente, junto a nuestra propuesta de cambio unificaremos 3 módulos ("Calendario", "Mascota Virtual", "Notificaciones"), en una sola base de datos para así poder optimizar y agilizar tanto solicitudes de usuario, tiempo de espera y ejecución del sistema. A su vez se unificaran las dependencias ya que  por ejemplo al completar una tarea del calendarios acreditaran puntos al usuario en la misma transacción, no  hay peligro de que un servicio funcione y el otro falle.

# Problemática:

Una gran problemática en el ámbito universitario es la gestión ineficiente del tiempo, lo que provoca procrastinación por parte de los estudiantes y un aumento en los niveles de estrés académico. Los estudiantes enfrentan una desconexión crítica entre la planificación y la ejecución diaria. Esta desorganización no solo compromete el rendimiento en evaluaciones, sino que también genera una sensación de parálisis frente a objetivos complejos.

# Solución del problema:

Nuestra propuesta consiste en una aplicación que automatiza la planificación diaria para que el estudiante no tenga que decidir qué hacer en cada momento. El software distribuye las tareas pendientes en un calendario inteligente, asignando bloques específicos tanto para el estudio como para el descanso necesario.

Para asegurar que el usuario siga este plan, el sistema relaciona el progreso académico con la vida de una mascota virtual. Al cumplir con los objetivos establecidos, la mascota permanece saludable; pero, si el usuario posterga sus deberes, esta mostrará signos de descuido y enviará alertas sobre su estado anímico. De este modo, se sustituye la presión tradicional por un sistema de cuidado y responsabilidad personal.

# Historias de usuarios 

| ID      | Nombre                                                                                                                     | Issue |
| :------ | :------------------------------------------------------------------------------------------------------------------------  | :---- |
| US - 01 | [Calendario](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/16)                                                   |   1   |
| US - 02 | [Tareas](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/17)                                                       |   2   |
| US - 03 | [Gamificacón](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/18)                                                  |   3   |


# Diseño arquitectónico: 

 [ Ver Diseño arquitectonico](ARQUI.md)

# Requisitos Extrafuncionales:

[Ver Requisitos Extrafuncionales](ReqExtrafuncionales.md)

# Entidades del dominio:

[Ver Entidades del dominio](Entidades.md)

# Figma

[Focuspets](https://www.figma.com/design/Wo9LP4ZsXVFpqH7CqpHS1T/FocusPet-Home?node-id=0-1&p=f&t=JbesrMftXTk4cdNU-0)
