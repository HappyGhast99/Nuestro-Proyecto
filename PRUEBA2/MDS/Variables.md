# Variables de entorno
El proyecto está configurado para ejecutarse localmente de forma predeterminada sin necesidad de crear archivos .env complejos. Sin embargo, soporta y reconoce los siguientes parámetros de entorno recomendados para configuraciones de despliegue en servidores de producción (ej. Render, Heroku):

| Variable | Tipo |  Descripción	| Valor por defecto |
|--- |---|--- |---|
| PORT | Numérico | Define el puerto TCP por el cual el servidor Express escuchará las peticiones HTTP. | 3000 |
| NODE_ENV	| Texto |	 Define el modo de ejecución de Node (ej. development para pruebas locales, o production para optimización en la nube).| 	development |
| DATABASE_PATH	| Texto |  Ruta relativa o absoluta hacia el archivo de almacenamiento de SQLite. |	 ./datos.db |
