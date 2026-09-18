import React, { useState, useEffect } from 'react';

export default function ConfigView() {
  const [apiKey, setApiKey] = useState('');
  const [profName, setProfName] = useState('');
  const [profTitle, setProfTitle] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('mai_gemini_api_key');
    const storedName = localStorage.getItem('mai_prof_name');
    const storedTitle = localStorage.getItem('mai_prof_title');
    if (storedKey) setApiKey(storedKey);
    if (storedName) setProfName(storedName);
    if (storedTitle) setProfTitle(storedTitle);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('mai_gemini_api_key', apiKey);
    localStorage.setItem('mai_prof_name', profName);
    localStorage.setItem('mai_prof_title', profTitle);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClear = () => {
    if(window.confirm('¿Estás segura de eliminar todos los datos de configuración?')) {
      localStorage.removeItem('mai_gemini_api_key');
      localStorage.removeItem('mai_prof_name');
      localStorage.removeItem('mai_prof_title');
      setApiKey('');
      setProfName('');
      setProfTitle('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300 mt-10">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Configuración del Sistema MAI</h2>
            <p className="text-sm text-slate-500">Administra las integraciones y ajustes de la aplicación.</p>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Perfil Profesional */}
            <div className="pb-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Firma Profesional
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Estos datos se usarán automáticamente como firma cuando envíes adecuaciones por WhatsApp o Email a otros docentes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    placeholder="Ej: Lic. María López"
                    className="w-full rounded-md border border-slate-300 p-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cargo / Especialidad</label>
                  <input 
                    type="text" 
                    value={profTitle}
                    onChange={(e) => setProfTitle(e.target.value)}
                    placeholder="Ej: Maestra de Apoyo a la Inclusión"
                    className="w-full rounded-md border border-slate-300 p-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* API Key */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                Google Gemini API Key
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Para que el Agente MAI pueda analizar documentos e imágenes mediante Inteligencia Artificial, necesita conectarse a Google Gemini. Ingresa tu clave privada aquí. Se guardará localmente en tu navegador. Si usás el archivo `.env.local` global, podés dejar esto vacío.
              </p>
              
              <div className="relative">
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSyB-........................."
                  className="w-full rounded-md border border-slate-300 p-3 pr-24 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-mono text-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {apiKey && (
                    <button type="button" onClick={handleClear} className="text-slate-400 hover:text-red-500" title="Borrar clave">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                {saved && (
                  <span className="text-emerald-600 font-medium text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ¡Clave guardada exitosamente!
                  </span>
                )}
              </div>
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm"
              >
                Guardar Configuración
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 flex gap-3">
        <svg className="w-6 h-6 flex-shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <p>
          <strong>Privacidad:</strong> Esta clave API no se envía a ningún servidor central nuestro. Solo se utiliza para comunicarse directamente desde tu computadora hacia los servidores seguros de Google Gemini para procesar las adecuaciones.
        </p>
      </div>
    </div>
  );
}
