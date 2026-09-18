import { GoogleGenAI } from "@google/genai";

// Función auxiliar para convertir el archivo (File) subido en Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // El resultado viene como "data:image/jpeg;base64,......."
      // Necesitamos solo la parte base64 para la API
      const base64Data = reader.result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Envía la tarea y el perfil al modelo de Gemini para realizar la adecuación.
 * @param {File} file Archivo PDF o JPG subido por el usuario.
 * @param {Object} legajo Objeto con la información del alumno activo.
 * @param {string} sugerenciasMaestro Texto opcional con indicaciones del maestro.
 * @returns {Promise<string>} La respuesta en formato Markdown adaptado.
 */
export async function generarAdecuacion(file, legajo, sugerenciasMaestro = '') {
  // Primero intentamos leer la configuración local del usuario (para personalización)
  // Si no está, intentamos leer la variable de entorno global (.env.local)
  const apiKey = localStorage.getItem('mai_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'ACA_VA_TU_CLAVE_DE_GEMINI') {
    throw new Error('API_KEY_MISSING');
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const base64Data = await fileToBase64(file);
    const mimeType = file.type; // image/jpeg, image/png o application/pdf

    // Construimos la instrucción experta para el Agente MAI
    const systemInstruction = `
      Eres el "Agente MAI" (Maestra de Apoyo a la Inclusión), un especialista avanzado en psicopedagogía y educación inclusiva.
      Tu tarea es observar el documento escolar proporcionado (foto o PDF de una tarea enviada por el docente de grado) y transformarlo para que sea accesible para un alumno con necesidades educativas específicas.
      
      PERFIL DEL ALUMNO:
      - Diagnóstico principal: ${legajo.diagnostico || 'Ninguno especificado'}
      - Observaciones del perfil de aprendizaje: ${legajo.perfil || 'Ninguna observación adicional.'}

      INSTRUCCIONES ESPECÍFICAS DEL MAESTRO INTEGRADOR PARA ESTA TAREA:
      ${sugerenciasMaestro ? sugerenciasMaestro : 'El maestro no dejó instrucciones adicionales. Aplica tu criterio profesional estándar.'}

      REGLAS DE ADECUACIÓN GENERALES:
      1. Extrae mediante OCR todo el texto útil de la imagen. Ignora decoración irrelevante.
      2. Reescribe la consigna adaptándola rigurosamente al diagnóstico del alumno y a las instrucciones del maestro. Por ejemplo, si es Dislexia, usa oraciones cortas, listas con viñetas, lenguaje directo y divide tareas complejas en pasos sencillos. Si es TEA, añade descripciones explícitas, elimina metáforas y estructura la tarea de forma hiper-predecible.
      3. Mantén el objetivo pedagógico intacto (no resuelvas la tarea por él, solo adecúa el "cómo" se presenta).
      4. Si crees que un apoyo visual o una sugerencia para el maestro integrador es necesaria, agrégala en un bloque resaltado usando blockquotes o un formato distintivo.
      5. Devuelve el resultado en formato Markdown perfectamente formateado.
    `;

    const prompt = `Por favor, adecúa la siguiente tarea según el perfil pedagógico indicado.`;

    const response = await ai.interactions.create({
      model: "gemini-3.8-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2 // Queremos respuestas deterministas y consistentes
      },
      input: [
        { text: prompt },
        { inlineData: { data: base64Data, mimeType: mimeType } }
      ]
    });

    return response.output_text;

  } catch (error) {
    console.error("Error al conectar con Gemini:", error);
    throw error;
  }
}
