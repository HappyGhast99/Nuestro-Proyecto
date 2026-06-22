# FocusPets 

  

## Descripción del sistema 

[Breve descripción del problema y solución propuesta] 

  

## Historia de usuario implementada 

| ID    | Nombre                    | Issue | 

|-------|---------------------------|-------| 

| US-XX | [nombre]                  | #N    | 

(Debe integrar: búsqueda con filtro, CRUD de una entidad y transacción que une 2+ entidades) 

  

## Artefactos del proyecto 

| Artefacto                          | Ubicación / enlace          | 

|------------------------------------|-----------------------------| 

| Modelo de dominio                  | [enlace o imagen]           | 

| Diagrama de casos de uso           | [enlace o imagen]           | 

| Especificación de HU               | [Especificacion de HU](./docs/EspecificacionHU.md)       | 

| Diagrama de estados                | [enlace o imagen]           | 

| Diagrama de despliegue y comp.     | [enlace o imagen]           | 

| Diagrama de componentes            | [enlace o imagen]           | 

| Diagrama de secuencia              | [enlace o imagen]           | 

| Casos de prueba                    | [Casos de prueba.md](./docs/CasosDePrueba.md)          | 

| Deuda técnica / code smells        | [Deuda Tecnica](./docs/DeudaTecnica.md)           | 

  

## Instrucciones de instalación y ejecución 

### Requisitos previos 

[Lenguaje/versión, base de datos, Docker, etc.] 

### Variables de entorno 

[Lista de variables necesarias] 

### Instalación y ejecución (sin Docker) 

[Comandos paso a paso] 

### Instalación y ejecución (con Docker)  <!-- si aplica (bonus) --> 

docker-compose up --build 

  

## Responsabilidades del equipo 

| Integrante | Rol(es) | Ítems de la rúbrica a cargo | 

|------------|---------|-----------------------------| 

| [Nombre 1] | [Rol]   | [Ítems]                     | 

| [Nombre 2] | [Rol]   | [Ítems]                     | 

  

## Bonus (opcional) 

- Contenedores: [sí/no] — docker-compose en ./docker-compose.yml 

- Spec-driven development: [sí/no] — especificaciones en ./openspecs/ 

# Tecnologias:

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
