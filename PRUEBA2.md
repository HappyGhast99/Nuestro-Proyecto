# FocusPets 🐾


## Descripción del sistema 

### Problemática:

Una gran problemática en el ámbito universitario es la gestión ineficiente del tiempo, lo que provoca procrastinación por parte de los estudiantes y un aumento en los niveles de estrés académico. Los estudiantes enfrentan una desconexión crítica entre la planificación y la ejecución diaria. Esta desorganización no solo compromete el rendimiento en evaluaciones, sino que también genera una sensación de parálisis frente a objetivos complejos.

### Solución del problema:

Nuestra propuesta consiste en una aplicación que automatiza la planificación diaria para que el estudiante no tenga que decidir qué hacer en cada momento. El software distribuye las tareas pendientes en un calendario inteligente, asignando bloques específicos tanto para el estudio como para el descanso necesario.

Para asegurar que el usuario siga este plan, el sistema relaciona el progreso académico con la vida de una mascota virtual. Al cumplir con los objetivos establecidos, la mascota permanece saludable; pero, si el usuario posterga sus deberes, esta mostrará signos de descuido y enviará alertas sobre su estado anímico. De este modo, se sustituye la presión tradicional por un sistema de cuidado y responsabilidad personal.

  

## Historia de usuario implementada 

|  ID | Historia | Puntos |
|----|----------|--------|
| US - 02 | [Fragmentación de proyectos en subtareas](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/3)               |   2   |
| US - 09 | [Personalización de la mascota](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/10)                        |   9   |

  

## Artefactos del proyecto 

| Artefacto                          | Ubicación / enlace          | 
|------------------------------------|-----------------------------| 
| Modelo de dominio                  | [Modelo de dominio](./diagramas/modelodominio.png)          | 
| Diagrama de casos de uso           | [Casos de uso](./diagramas/Sistemafocuspets.png)           | 
| Especificación de HU               | [Especificacion de HU](./docs/EspecificacionHU.md)       | 
| Diagrama de estados                | [Diagrama de Estados](./diagramas/diagramadeestados.png)           | 
| Diagrama de despliegue y comp.     | [Despliegue y componentes](./diagramas/diagramadespliegue.png)           | 
| Diagrama de componentes            | [Diagrama de componentes](./diagramadecomponentes.png)         | 
| Diagrama de secuencia              | [Diagrama de secuencia](./diagramadesecuencia.png)           | 
| Casos de prueba                    | [Casos de prueba.md](./docs/CasosDePrueba)          | 
| Deuda técnica / code smells        | [Deuda Tecnica](./docs/DeudaTecnica.md)           | 

  

## Instrucciones de instalación y ejecución 

### Requisitos previos 

[Ver los requisitos previos](Requisitos.md)

### Variables de entorno 

[Ver las variables de entorno](Variables.md)

### Instalación y ejecución (sin Docker) 

[Ver instalacion y ejecucion sin docker](SinDocker.md)

### Instalación y ejecución (con Docker)  <!-- si aplica (bonus) --> 

[Ver instalacion y ejecucion con docker](ConDocker.md)

## Bonus (opcional) 

- Contenedores: sí — docker-compose en ./ConDocker.md 

- Spec-driven development: sí — especificaciones en ./openspecs/ 

## Tecnologias:

[Ver tecnologias](Tecnologias.md)

## Responsabilidades del equipo 

| Integrantes                | Rol           | Ítems de la rúbrica a cargo                                                                   |
| :------------------------- | :------------ | :-------------------------------------------------------------------------------------------- |
| Antonia Bustamante Borquez | Product Owner | Analista de Requerimientos.                                                                   |
| Joaquin Bustamante Ramirez | Developers    | Ingeniero de Pruebas (QA).                                                                    |
| Fernanda Cerda Toledo      | Developers    | Desarrolladora Backend - API 1.                                                               |
| Martin Duran Salinas       | Scrum Master  | Desarrollador Backend - API 2.                                                                |
| Matthew Osorio Muñoz       | Developers    | Integrador y Gestor del Repositorio.                                                          |

