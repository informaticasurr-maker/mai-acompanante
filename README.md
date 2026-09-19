# MAI - Asistente de Apoyo a la Inclusión

MAI es una aplicación web progresiva (PWA) diseñada específicamente para **Maestros de Apoyo a la Inclusión**. Su objetivo principal es automatizar tareas administrativas (presupuestos, planillas, contratos) y utilizar Inteligencia Artificial (Google Gemini) para generar adecuaciones curriculares personalizadas basadas en el perfil de cada alumno.

## Características Principales ✨

- **Autenticación con Google**: Acceso seguro y rápido usando Firebase Auth.
- **Sincronización en la Nube (Firestore)**: Los legajos de los alumnos se guardan en la nube, permitiendo acceder a ellos desde cualquier dispositivo (PC, tablet o celular).
- **Bitácoras Inteligentes (Storage)**: Posibilidad de subir y almacenar encriptadamente informes, PDFs y fotos del perfil de cada alumno.
- **Autocompletado Automático**: Generación rápida de Presupuestos, Planillas de Asistencia y Contratos utilizando los datos del alumno activo y la firma del profesional guardada en el sistema.
- **Adecuaciones Curriculares (IA)**: Integración directa con **Google Gemini 1.5 Flash**. Al subir una foto o PDF de una tarea, MAI lee el documento y lo adapta automáticamente a las necesidades pedagógicas del alumno activo (Ej: Dislexia, TEA, TDAH, etc.).
- **Diseño Responsivo**: Interfaz moderna y adaptable construida con Tailwind CSS.

## Stack Tecnológico 🛠️

- **Frontend**: React.js + Vite
- **Estilos**: Tailwind CSS
- **Backend / Database**: Firebase (Auth, Firestore, Storage)
- **Inteligencia Artificial**: Google Gemini API (@google/genai)
- **Despliegue**: PWA Ready

## Configuración y Despliegue Local 🚀

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/informaticasurr-maker/mai-acompanante.git
   cd mai-acompanante
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Variables de Entorno:
   Debes crear un archivo `.env.local` en la raíz del proyecto con la clave global de Gemini (o configurarla dentro de la app mediante la interfaz):
   ```env
   VITE_GEMINI_API_KEY=AIzaSyB-TU-CLAVE-AQUI
   ```

4. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Privacidad y Seguridad 🔒

El sistema está diseñado de forma descentralizada. La configuración del profesional (Nombre, Cargo, API Key privada) se almacena preferentemente en Firebase para sincronización, pero nunca se expone públicamente. Las adecuaciones viajan directamente desde el dispositivo del maestro hacia los servidores de Google Gemini.

---

Desarrollado por **CodeGhodes** - [www.codeghodes.com](http://www.codeghodes.com) | Contacto: codeghodes@gmail.com
