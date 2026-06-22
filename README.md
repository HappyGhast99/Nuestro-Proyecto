# Nuestro Proyecto
# Problemática:

Una gran problemática en el ámbito universitario es la gestión ineficiente del tiempo, lo que provoca procrastinación por parte de los estudiantes y un aumento en los niveles de estrés académico. Los estudiantes enfrentan una desconexión crítica entre la planificación y la ejecución diaria. Esta desorganización no solo compromete el rendimiento en evaluaciones, sino que también genera una sensación de parálisis frente a objetivos complejos.

# Solución del problema:

Nuestra propuesta consiste en una aplicación que automatiza la planificación diaria para que el estudiante no tenga que decidir qué hacer en cada momento. El software distribuye las tareas pendientes en un calendario inteligente, asignando bloques específicos tanto para el estudio como para el descanso necesario.

Para asegurar que el usuario siga este plan, el sistema relaciona el progreso académico con la vida de una mascota virtual. Al cumplir con los objetivos establecidos, la mascota permanece saludable; pero, si el usuario posterga sus deberes, esta mostrará signos de descuido y enviará alertas sobre su estado anímico. De este modo, se sustituye la presión tradicional por un sistema de cuidado y responsabilidad personal.

# PRUEBA 2



# Historias de usuarios epicas:

| ID      | Nombre                                                                                                                     | Issue |
| :------ | :------------------------------------------------------------------------------------------------------------------------  | :---- |
| US - 01 | [Organización y estudio entretenido](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/13)                           |   1   |
| US - 02 | [Gestión de la atención y enfoque](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/14)                             |   2   |
| US - 03 | [Motor de inteligencia predictiva y autoconocimiento temporal](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/15) |   3   |

# Historias de usuarios:

| ID      | Nombre                                                                                                             | Issue |
| :------ | :----------------------------------------------------------------------------------------------------------------- | :---- |
| US - 01 | [Sistema de alertas visuales por semáforo de urgencia](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/2)  |   1   |
| US - 02 | [Fragmentación de proyectos en subtareas](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/3)               |   2   |
| US - 03 | [Modo de enfoque con restricción de interrupciones](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/4)     |   3   |
| US - 04 | [Sistema de recompensa y racha diaria](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/5)                  |   4   |
| US - 05 | [Retroalimentación de estimación en tiempo real](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/6)        |   5   |
| US - 06 | [Estado anímico vinculado al progreso](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/7)                  |   6   |
| US - 07 | [Sincronización de hitos académicos](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/8)                    |   7   |
| US - 08 | [Generación automática del plan semanal](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/9)                |   8   |
| US - 09 | [Personalización de la mascota](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/10)                        |   9   |
| US - 10 | [Sistema de alertas emocionales (notificaciones)](https://github.com/HappyGhast99/Nuestro-Proyecto/issues/11)      |   10  |

# Diseño Arquitectónico: 

[Ver Diseño Arquitectónico](Arquitectura.md)

# Requisitos Extrafuncionales:

[Ver Requisitos Extrafuncionales](ReqExtrafuncionales.md)

# Entidades del dominio:

[Ver Entidades del dominio](Entidadesdedominio.md)

# Figma:

[Focuspets](https://www.figma.com/design/Wo9LP4ZsXVFpqH7CqpHS1T/FocusPet-Home?node-id=0-1&p=f&t=JbesrMftXTk4cdNU-0)

# Link de Clarita Review:

[LINK](https://chatgpt.com/share/6a1e80bb-6f58-83e9-a592-1f2c1e07fd7d)

# Imagenes de testeo sobre API subtareas:

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
  
# Integrantes de la organización:

| Integrantes                | Rol           | Ítems de la rúbrica a cargo                                                                   |
| :------------------------- | :------------ | :-------------------------------------------------------------------------------------------- |
| Antonia Bustamante Borquez | Product Owner | Analista de Requerimientos.                                                                   |
| Joaquin Bustamante Ramirez | Developers    | Ingeniero de Pruebas (QA).                                                                    |
| Fernanda Cerda Toledo      | Developers    | Desarrolladora Backend - API 1.                                                               |
| Martin Duran Salinas       | Scrum Master  | Desarrollador Backend - API 2.                                                                |
| Matthew Osorio Muñoz       | Developers    | Integrador y Gestor del Repositorio.                                                          |



