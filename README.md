# Blog Dinámico

Este es un proyecto de un blog dinámico creado con React, Vite, y TypeScript. La aplicación permite a los usuarios ver, crear y gestionar posts, con un sistema de autenticación basado en Firebase.

## Flujo de la Aplicación

El flujo de la aplicación se centra en la gestión de posts. Los usuarios pueden registrarse e iniciar sesión para crear nuevos posts, ver los posts existentes y ver detalles de cada post. Las rutas de la aplicación están protegidas para que solo los usuarios autenticados puedan crear y gestionar sus posts.

## Componentes Principales

- **`app.tsx`**: El componente raíz de la aplicación, donde se configuran los providers de React Query y Autenticación.
- **`router/index.tsx`**: Define las rutas de la aplicación utilizando `react-router-dom`, incluyendo rutas públicas y protegidas.
- **`layout/main.layout.tsx`**: El layout principal de la aplicación, que incluye el header y el footer.
- **`screens`**: Contiene los componentes de página para cada ruta, como `home.tsx`, `all-posts.tsx`, `create-post.tsx`, etc.
- **`modules`**: Contiene la lógica de negocio de la aplicación, separada por dominios como `auth` y `post`.
  - **`auth`**: Contiene todo lo relacionado con la autenticación, incluyendo el contexto, hooks, y servicios de Firebase.
  - **`post`**: Contiene la lógica para crear, leer y gestionar posts.

## Decisiones de Diseño

- **Arquitectura Modular**: El proyecto está organizado en módulos (`auth`, `post`) para separar las responsabilidades y facilitar el mantenimiento. Cada módulo sigue una estructura de `application`, `domain`, y `infrastructure`.
- **Estado Global con React Query**: Se utiliza `@tanstack/react-query` para gestionar el estado del servidor, cachear datos y manejar operaciones asíncronas.
- **Autenticación con Firebase**: La autenticación de usuarios se gestiona a través de Firebase, proporcionando un sistema seguro y escalable.
- **Componentes Reutilizables**: Se han creado componentes genéricos en la carpeta `components` para ser reutilizados a lo largo de la aplicación.
- **Estilos con Tailwind CSS y DaisyUI**: Se utiliza Tailwind CSS para un desarrollo de UI rápido y personalizable, junto con DaisyUI para componentes de UI pre-construidos.

## Instalación

1.  Clona el repositorio:
    ```bash
    git clone git@github.com:Proskynete/ipg-blog-dinamico.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd blog-dinamico
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Crea un archivo `.env` a partir del template `.env.template` y añade las siguientes credenciales de Firebase.

```bash
VITE_FIREBASE_APIKEY="AIzaSyBz-29rNfsur13Ys1ekTBtlNpTsh1IPEMM"
VITE_FIREBASE_AUTHDOMAIN="frontend-semana-4-encargo.firebaseapp.com"
VITE_FIREBASE_PROJECTID="frontend-semana-4-encargo"
VITE_FIREBASE_STORAGEBUCKET="frontend-semana-4-encargo.firebasestorage.app"
VITE_FIREBASE_MESSAGINGSENDERID="958021446911"
VITE_FIREBASE_APPID="1:958021446911:web:a3c4d30ca305306b6370ca"
VITE_FIREBASE_MEASUREMENTID="G-G34JP2Y090"
```

## Ejecución

Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará un servidor de desarrollo en `http://localhost:5173`.

### Otros Comandos

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Test**: `npm run test`
