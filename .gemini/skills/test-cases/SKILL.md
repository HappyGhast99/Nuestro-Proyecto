---
name: test-cases
description: Analyzes the main API entity and generates a test-cases.md document under docs/ containing structured equivalence classes and boundary value tests.
license: MIT
compatibility: General-purpose documentation skill.
metadata:
  author: OpenSpec
  version: "1.0"
---

# Reusable Test Cases Generator

This skill scans the main database entity defined in the API, and generates a comprehensive testing guide in `docs/test-cases.md` containing equivalence classes and boundary value tables for POST and PUT endpoints.

## Steps

1. **Locate the main API entities**:
   Find the schema definitions or database tables representing the main resource of the API (e.g., `tareas` or `cursos`).

2. **Define Test Cases**:
   - Apply **Equivalence Partitioning**:
     - Define at least one valid case for the entity.
     - Define at least two invalid cases per required field (e.g. empty string, wrong data type, missing field, negative numbers).
   - Apply **Boundary Value Analysis**:
     - Define cases around the minimum and maximum boundaries for integer fields (e.g., `duracion_bloque` or `creditos`).

3. **Generate Output**:
   Write the tables to `docs/test-cases.md` including columns for ID, Technique, Description, Input JSON, Expected HTTP response, and an empty column for "Resultado real".
