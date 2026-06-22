# Requisitos previos
Para poder ejecutar la aplicación correctamente, el entorno de desarrollo debe contar con las siguientes tecnologías instaladas:

- Lenguaje y Versión: Node.js (versión 18.x o superior). Incluye el gestor de paquetes NPM utilizado para administrar las dependencias de la aplicación.
- Base de datos: SQLite 3. No es necesario instalar un servidor de base de datos independiente (como MySQL o PostgreSQL), ya que SQLite es un motor de base de datos embebido y autónomo. El archivo de base de datos (datos.db) se autogenera en la raíz del proyecto durante el primer inicio de la aplicación mediante el paquete de Node better-sqlite3.
- Docker (Opcional): No es mandatorio para la ejecución local ordinaria del proyecto, puesto que corre directamente sobre el runtime de Node.js instalado en el sistema operativo.
