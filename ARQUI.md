# Diseño arquitectónico NUEVO 

## Como equipo, llegamos a la decisión de optar por el diseño arquitectónico de __Microservicios__, basándonos en las prioridades de nuestro proyecto y en nuestra visión sobre la función de la página/aplicación, ya que necesitamos muchos procesos que deben funcionar a la vez, pero de manera independiente, como:

* __Microservicio para Usuarios (BD)__: Debido a que necesitamos los datos del usuario, como nombre, email, contraseña, etc.

* __Microservicio de Tareas/Calendario, Mascota Virtual, Notificaciones/Rachas__ (BD unificada y nueva): Debido que se nos pidió una nueva BD con respuesta mas eficiente (rapida), llegamos a la conclusion de unir estos 3 micro-servicios, para que funcionen de forma simultanea, por lo que las solicitudes de informacion no sean tan duraderas ni extendidas, sino que con un tiempo de respuesta mas corto.

* __Microservicio para Pagos/Suscripciones__: Esta sección debe ser, sobre todo, la más independiente del resto, para brindar seguridad a través de una BD aislada de las demás y proteger específicamente esta información del usuario.

Esta estructura escogida es compleja de aplicar, pero, a pesar de eso, consideramos que es la más indicada para nuestros objetivos. Al ser todo independiente, podemos organizarnos mejor con cada cambio, así como correlacionar entre sí aquellos microservicios. De esta forma, podemos trabajar de manera independiente en cada uno y, al mismo tiempo, lograr que se integren entre ellos.

# Diagrama de arquitectónico:

