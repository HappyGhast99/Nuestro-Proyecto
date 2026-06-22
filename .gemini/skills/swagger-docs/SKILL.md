---
name: swagger-docs
description: Generates OpenAPI 3.0 documentation for all Express API endpoints and serves it interactively on /docs.
license: MIT
compatibility: Requires express, swagger-ui-express, and swagger-jsdoc npm packages.
metadata:
  author: OpenSpec
  version: "1.0"
---

# Reusable Swagger Documentation Generator

This skill scans the project's main Express server file, installs swagger documentation libraries if missing, and configures Swagger UI to serve interactive documentation on `/docs` without altering existing business logic.

## Steps

1. **Verify or install dependencies**:
   Check if `swagger-ui-express` and `swagger-jsdoc` are present in `package.json`. If not, run:
   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

2. **Locate main Express file**:
   Identify the entry point of the API (typically `index.js`, `server.js`, or `app.js`).

3. **Insert Swagger Setup**:
   Insert the required swagger imports and middleware initialization into the main file:
   ```javascript
   const swaggerUi = require('swagger-ui-express');
   const swaggerJsdoc = require('swagger-jsdoc');

   const swaggerSpec = swaggerJsdoc({
     definition: {
       openapi: '3.0.0',
       info: { title: 'API Documentation', version: '1.0.0' },
       servers: [
         { url: 'http://localhost:3000', description: 'Local Server' }
       ]
     },
     apis: ['./*.js'] // Scan current directory files for annotations
   });

   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   ```

4. **Verify Annotations**:
   Ensure all active routes have JSDoc comments containing `@swagger` tags describing their inputs, methods, and response codes.
