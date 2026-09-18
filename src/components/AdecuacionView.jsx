import React, { useState, useRef } from 'react';
import { useLegajos } from '../context/LegajosContext';
import { generarAdecuacion } from '../services/gemini';
import Markdown from 'react-markdown'; // Renderizador para la respuesta en formato Markdown

export default function AdecuacionView() {
  const { activeLegajo } = useLegajos();
  
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, scanning, generating, done, error
  const [resultadoAPI, setResultadoAPI] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sugerenciasMaestro, setSugerenciasMaestro] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(uploadedFile.type)) {
      alert("Por favor, subí solo archivos JPG, PNG o PDF.");
      return;
    }
    setFile(uploadedFile);
    setStatus('idle');
    setResultadoAPI(null);
  };

  const procesarArchivo = async () => {
    if (!activeLegajo) {
      alert("Por favor, seleccioná un 'Alumno Activo' en la barra superior antes de adecuar.");
      return;
    }
    
    setStatus('scanning');
    setErrorMsg(null);
    
    try {
      setStatus('generating');
      const resultado = await generarAdecuacion(file, activeLegajo, sugerenciasMaestro);
      setResultadoAPI(resultado);
      setStatus('done');
    } catch (error) {
      console.error(error);
      if (error.message === 'API_KEY_MISSING') {
        setErrorMsg("Falta la API Key. Por favor ve a Configuración (⚙️) y guárdala.");
      } else {
        setErrorMsg("Error al conectar con Gemini: " + error.message);
      }
      setStatus('error');
    }
  };

  const formatShareText = () => {
    const profName = localStorage.getItem('mai_prof_name') || '';
    const profTitle = localStorage.getItem('mai_prof_title') || '';
    
    let signature = '';
    if (profName) {
      signature = `\n\n---\nEnviado por: ${profName}${profTitle ? ` - ${profTitle}` : ''}\nGenerado con MAI Assistant.`;
    }

    return `*Adecuación Curricular*\nAlumno/a: ${activeLegajo?.pacNombre}\n\n${resultadoAPI}${signature}`;
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(formatShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Adecuación Curricular - ${activeLegajo?.pacNombre}`);
    const body = encodeURIComponent(formatShareText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setResultadoAPI(null);
    setErrorMsg(null);
    setSugerenciasMaestro('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Cabecera dinámica según el alumno activo */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Motor de Adecuación MAI</h2>
          {activeLegajo ? (
            <p className="text-indigo-100 text-lg">
              Adaptando tareas para: <strong className="text-white">{activeLegajo.pacNombre}</strong> 
              <span className="ml-2 inline-block bg-white/20 px-2 py-1 rounded text-sm font-semibold border border-white/30">
                {activeLegajo.diagnostico || 'Sin diagnóstico'}
              </span>
            </p>
          ) : (
            <p className="text-indigo-100 bg-red-500/20 inline-block px-3 py-1 rounded-lg border border-red-400/30 font-medium">
              ⚠️ Seleccioná un Alumno Activo en el menú superior para empezar.
            </p>
          )}
        </div>
        <svg className="absolute right-0 bottom-0 opacity-10 w-48 h-48 transform translate-x-8 translate-y-8" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Lado Izquierdo: Input / Carga de Archivo */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Tarea Original del Docente
            </h3>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-center">
            {!file ? (
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[250px]
                  ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 text-indigo-500 mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h4 className="text-lg font-semibold text-slate-700 mb-1">Subir Archivo JPG o PDF</h4>
                <p className="text-sm text-slate-500 max-w-[200px] mb-4 mx-auto">Arrastrá y soltá el archivo acá, o hacé clic para buscar en tu dispositivo.</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/jpeg, image/png, application/pdf"
                  onChange={handleFileSelect}
                />
                <div className="flex justify-center">
                  <span className="bg-white border border-slate-200 text-slate-700 font-medium py-1.5 px-4 rounded-full text-xs shadow-sm">
                    Explorar Archivos
                  </span>
                </div>
              </div>
            ) : (
              <div className="border border-indigo-100 bg-indigo-50 rounded-xl p-6 text-center flex flex-col items-center min-h-[250px] justify-center relative">
                <button onClick={reset} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors" title="Quitar archivo">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="w-16 h-16 bg-white shadow-sm rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                  {file.type === 'application/pdf' ? (
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 6H7a2 2 0 00-2 2v11a2 2 0 002 2z" /></svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  )}
                </div>
                <h4 className="text-slate-800 font-semibold mb-1 truncate max-w-[250px]">{file.name}</h4>
                <p className="text-xs text-slate-500 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                
                {status === 'idle' && (
                  <button 
                    onClick={procesarArchivo}
                    disabled={!activeLegajo}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg w-full flex justify-center items-center gap-2 shadow-sm transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Adecuar para {activeLegajo ? activeLegajo.pacNombre.split(' ')[0] : 'Alumno'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lado Derecho: Resultado */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden min-h-[400px]">
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Resultado Adaptado
            </h3>
            {status === 'done' && (
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-md border border-indigo-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Imprimir
              </button>
            )}
          </div>
          
          <div className="p-6 flex-1 bg-slate-50 flex flex-col">
            {status === 'idle' && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <svg className="w-16 h-16 mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <p className="max-w-[250px] text-center text-sm">Cargá el archivo original y apretá "Adecuar" para ver la magia de la IA aquí.</p>
              </div>
            )}

            {status === 'scanning' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-slate-600 font-medium animate-pulse">Escaneando texto (OCR) del archivo...</p>
                <p className="text-xs text-slate-400 mt-2">Identificando párrafos e imágenes</p>
              </div>
            )}

            {status === 'generating' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <p className="text-slate-600 font-medium">Aplicando perfil pedagógico...</p>
                <p className="text-xs text-indigo-500 mt-2 font-semibold">Regla detectada: {activeLegajo?.diagnostico}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h4 className="text-red-600 font-bold mb-2">Error de Conexión</h4>
                <p className="text-sm text-slate-600 max-w-sm text-center">{errorMsg}</p>
                <button onClick={() => setStatus('idle')} className="mt-6 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300">
                  Volver a intentar
                </button>
              </div>
            )}

            {status === 'done' && (
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex-1 animate-in slide-in-from-bottom-4 fade-in duration-500 prose prose-indigo max-w-none">
                <div className="mb-4 pb-4 border-b border-dashed border-slate-200 flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg m-0">Adecuación Completada</h4>
                    <p className="text-sm text-slate-500 m-0 mt-1">Generado para: {activeLegajo?.pacNombre} ({activeLegajo?.diagnostico})</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleShareWhatsapp} className="flex items-center gap-1 bg-[#25D366] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#20b858] transition-colors" title="Enviar por WhatsApp">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      WhatsApp
                    </button>
                    <button onClick={handleShareEmail} className="flex items-center gap-1 bg-slate-800 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors" title="Enviar por Email">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Email
                    </button>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1.5 rounded ml-2">LISTO</span>
                  </div>
                </div>
                
                <div className="text-slate-800 markdown-body">
                  <Markdown>{resultadoAPI}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panel de Sugerencias del Maestro */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          Sugerencias del Maestro Integrador (Opcional)
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Indicá cómo querés que la Inteligencia Artificial adapte esta tarea específica.
        </p>
        <textarea 
          value={sugerenciasMaestro}
          onChange={(e) => setSugerenciasMaestro(e.target.value)}
          placeholder="Ej: La consigna original tiene 5 preguntas. Por favor, reducilas a 3 y agregá un ejemplo al principio para ayudar al alumno..."
          className="w-full rounded-md border border-slate-300 p-3 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-y min-h-[100px]"
        ></textarea>
      </div>

    </div>
  );
}
