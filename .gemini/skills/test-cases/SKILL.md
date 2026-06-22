---
name: test-cases
description: Analizar la entidad principal de la API y generar un archivo docs/test-cases.md con casos de prueba aplicando clases de equivalencia y análisis de valores límite.
license: MIT
compatibility: Genérico.
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.4.1"
---

Esta skill analiza la estructura y las validaciones de los endpoints de creación (POST) y actualización (PUT) de la entidad principal de la API, y genera un archivo de documentación con los casos de prueba necesarios.

## Pasos de Ejecución

1. **Analizar la API y sus Entidades**
   Revisar los archivos de controladores y rutas para identificar la entidad o entidades principales, sus campos, y las validaciones de negocio aplicadas.

2. **Diseñar Casos de Prueba**
   - **Clases de Equivalencia (CE):** Para cada campo relevante, definir al menos una clase de datos válida y dos clases inválidas (ej. campos vacíos, tipos de datos incorrectos, valores negativos/nulos).
   - **Análisis de Valores Límite (VL):** Para campos numéricos o de longitud de cadena, definir casos de prueba para el límite inferior y superior válido, justo debajo del mínimo, y justo sobre el máximo.

3. **Estructurar el Archivo de Salida**
   Crear o actualizar `docs/test-cases.md`. El archivo debe estructurarse con tablas claras que incluyan:
   - **ID**: Identificador del caso (ej. P01, L01).
   - **Técnica**: Técnica utilizada (CE para Clases de Equivalencia, VL para Valores Límite).
   - **Descripción**: Detalle breve de la prueba.
   - **Input JSON**: Objeto JSON listo para ser copiado y pegado en Thunder Client o Postman.
   - **HTTP esperado**: Código de estado HTTP esperado.
   - **Resultado real**: Columna vacía para completarse manualmente durante la prueba.

4. **Escribir el Archivo**
   Guardar la documentación en `docs/test-cases.md` dentro de la raíz del proyecto.
