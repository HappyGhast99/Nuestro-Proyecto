# Instalación y ejecución (sin Docker)
Para ejecutar este proyecto de forma local en tu máquina de desarrollo, sigue los siguientes pasos:

## Requisitos previos
Asegúrate de tener instalados los siguientes componentes en tu sistema:
- Node.js (Versión 18.0 o superior recomendada). Puedes descargarlo desde nodejs.org.
- Git para clonar el repositorio.

# Pasos para la instalación y ejecución

## Paso 1: Clonar el repositorio
Abre una terminal (PowerShell, Git Bash o CMD en Windows; Terminal en macOS/Linux) y clona el proyecto con el siguiente comando:
```bash
git clone https://github.com/HappyGhast99/Nuestro-Proyecto.git
cd Nuestro-Proyecto
```

## Paso 2: Cambiar a la rama de desarrollo
Para probar la última funcionalidad de incentivos, tareas y mascota unificada, cámbiate a la rama del desarrollo:
```bash
git checkout mi-actividad
```

## Paso 3: Instalar las dependencias de Node.js
Ejecuta el gestor de paquetes de Node para descargar e instalar todas las dependencias requeridas (Express, Better-SQLite3 y Swagger):
```bash
npm install
```

## Paso 4: Iniciar el servidor de desarrollo
Una vez finalizada la instalación de las dependencias, inicia el servidor local de la API ejecutando:
```bash
npm start
```
Nota: Este comando ejecutará el script node index.js. La primera vez que inicie, creará de manera automática el archivo local de la base de datos datos.db y las tablas necesarias.

## Paso 5: Acceder a la aplicación
Con el servidor encendido y escuchando en el puerto 3000, abre tu navegador preferido e ingresa a las siguientes rutas:

- Aplicación Web (Frontend): http://localhost:3000
- Documentación Interactiva de la API (Swagger UI): http://localhost:3000/docs
