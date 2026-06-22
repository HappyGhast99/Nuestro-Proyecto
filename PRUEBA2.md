# Nuestro Proyecto : Focuspets

## Tecnologias:

*Backend y base de datos*

- Node.js: Entorno de ejecución para Javascript en el servidor.
- SQLite & better-sqlite3: Base de datos SQL embebida y relacional (datos.db). El paquete better-sqlite3 nos permite realizar consultas directas y síncronas de manera extremadamente rápida.
- OpenAPI 3.0 & Swagger UI (swagger-jsdoc + swagger-ui-express): Utilizado para documentar todos los endpoints de la API de forma interactiva. Permite probar las peticiones directamente desde la ruta /docs en el navegador.
- xpress.js (v5.x): Framework web minimalista utilizado para construir la API RESTful de la aplicación, gestionar las rutas y servir los archivos estáticos.

*Frontend*

- HTML5 Semántico: Para estructurar y dar accesibilidad a la aplicación.
- CSS3 Vanilla (Glassmorphism & Dark Mode): Diseño premium personalizado desde cero. Usamos variables CSS (:root), Grid de 4 columnas, Flexbox, y animaciones avanzadas mediante @keyframes para lograr efectos de flotación y progreso circular.
- JavaScript Vanilla (ES6+):
    - Fetch API: Para realizar todas las peticiones asíncronas al servidor (GET, POST, PUT, DELETE) sin recargar la página.
    - DOM Manipulation: Para actualizar dinámicamente el temporizador, las barras de salud/experiencia, las tareas en acordeón y las alertas.

*Herramientas de desarrollo y metodologia*

- Requests y resolución de conflictos de fusión).
- OpenSpec: Framework de diseño y especificación técnica que nos permitió estructurar las propuestas (proposal.md, design.md), archivar los cambios históricos y gestionar las decisiones de diseño mediante skills personalizadas.
- Thunder Client / Postman: Herramientas utilizadas para realizar las pruebas manuales de caja negra en los endpoints.

## Imagenes de testeo sobre API subtareas:

[Imagenes](./imagenes) (10)

## Instrucciones de instalación y ejecución (con Docker)

### Requisitos previos

- Tener instalado Docker y Docker Desktop.
- Tener instalado Git.

### Paso 1: Clonar el repositorio

Clona el repositorio principal del proyecto y entra a la carpeta:

```bash
git clone [AQUÍ_PONES_EL_LINK_DE_TU_REPO_DE_GITHUB]
cd Nuestro-Proyecto
```

### Paso 2: Configurar las variables de entorno

El proyecto requiere credenciales para la base de datos. Crea un archivo `.env` en la raíz del proyecto basándote en la plantilla existente:

- Copia el archivo `.env.example` y renómbralo a `.env`.
- (Opcional por terminal):

```bash
cp .env.example .env
```

### Paso 3: Levantar el proyecto completo

Ejecuta el siguiente comando para construir y encender la base de datos, la API y el frontend de forma simultánea:

```bash
docker compose up -d --build
```

### Paso 4: Acceder a la aplicación

- **Frontend:** `http://localhost:3001`
- **API Documentación:** `http://localhost:3000/docs`
