## Instrucciones de instalación y ejecución (con Docker)

### Requisitos previos

- Tener instalado Docker y Docker Desktop.
- Tener instalado Git.

### Paso 1: Clonar el repositorio

Clona el repositorio principal del proyecto y entra a la carpeta:

bash git clone [AQUÍ_PONES_EL_LINK_DE_TU_REPO_DE_GITHUB]

cd Nuestro-Proyecto


### Paso 2: Configurar las variables de entorno

El proyecto requiere credenciales para la base de datos. Crea un archivo .env en la raíz del proyecto basándote en la plantilla existente:

- Copia el archivo .env.example y renómbralo a .env.
- (Opcional por terminal):

bash cp .env.example .env


### Paso 3: Levantar el proyecto completo

Ejecuta el siguiente comando para construir y encender la base de datos, la API y el frontend de forma simultánea:

bash docker compose up -d --build


### Paso 4: Acceder a la aplicación

- *Frontend:* http://localhost:3001
- *API Documentación:* http://localhost:3000/docs
