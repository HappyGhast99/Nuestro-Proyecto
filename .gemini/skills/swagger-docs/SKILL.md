---
name: swagger-docs
description: Generar documentación OpenAPI 3.0 para todos los endpoints de la API y servirla en GET /docs.
license: MIT
compatibility: Requiere Express, swagger-ui-express y swagger-jsdoc.
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.4.1"
---

Esta skill se encarga de configurar y verificar la documentación interactiva de la API utilizando Swagger (OpenAPI 3.0) en proyectos Express.

## Pasos de Ejecución

1. **Verificar Dependencias**
   Comprobar si `swagger-ui-express` y `swagger-jsdoc` están instalados en `package.json`. Si no lo están, instalarlos con `npm install swagger-ui-express swagger-jsdoc`.

2. **Analizar Endpoints Existentes**
   Escanear el archivo de entrada principal (ej. `index.js`) y los archivos de rutas (ej. `routes/*.js`) para identificar endpoints expuestos que carezcan de documentación `@swagger`.

3. **Agregar Configuración de Swagger**
   Si no está configurado, agregar la inicialización de `swagger-jsdoc` y la ruta para servir Swagger UI en `/docs`:
   ```javascript
   const swaggerUi = require('swagger-ui-express');
   const swaggerJsdoc = require('swagger-jsdoc');

   const swaggerSpec = swaggerJsdoc({
     definition: {
       openapi: '3.0.0',
       info: { title: 'API Documentation', version: '1.0.0' },
       servers: [{ url: 'http://localhost:3000' }]
     },
     apis: ['./index.js', './routes/*.js']
   });

   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   ```

4. **Documentar Endpoints Faltantes**
   Asegurar que cada ruta cuente con sus respectivos comentarios JSDoc bajo la etiqueta `@swagger` especificando el método, la descripción y las respuestas esperadas.

5. **Verificar Funcionamiento**
   Levantar el servidor localmente (ej. `npm start` o `node index.js`) y acceder a `http://localhost:3000/docs` para comprobar que la documentación interactiva se renderiza correctamente.
