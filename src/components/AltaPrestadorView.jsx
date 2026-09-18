import React, { useState } from 'react';

const OBRAS_SOCIALES = [
  { id: 1, nombre: 'OSECAC', url: 'https://www.osecac.org.ar/Visualizadores/VerContenido/102', detalle: 'Portal de Autogestión - Prestadores.' },
  { id: 2, nombre: 'OSDE', url: 'https://www.osde.com.ar/prestadores', detalle: 'Sujeto a evaluación por auditoría según la necesidad de la zona. Se exige Título, Matrículas, RNP, inscripción en AFIP y Seguro de Mala Praxis.' },
  { id: 3, nombre: 'Galeno', url: 'mailto:doc.mail@galenoargentina.com.ar', detalle: 'No posee enlace web, solo correo. Enviar datos profesionales, CUIT, zona y especialidad.' },
  { id: 4, nombre: 'Swiss Medical', url: 'https://www.swissmedical.com.ar/prestadores/', detalle: 'Cuentan con formularios divididos por área. Requiere enviar postulación que luego es evaluada según demanda.' },
  { id: 5, nombre: 'PAMI', url: 'https://prestadores.pami.org.ar/', detalle: 'Hay que seleccionar la opción "Registrarse" y completar el formulario.' },
  { id: 6, nombre: 'IOMA', url: 'https://sistemas.ioma.gba.gov.ar/PortalPrestadores/', detalle: 'Para prestadores directos o acompañantes terapéuticos, la carga es en línea usando la opción "Postulate como prestadora/or".' },
  { id: 7, nombre: 'SanCor Salud', url: 'https://prestadores.sancorsalud.com.ar', detalle: 'Desde el portal se puede gestionar el registro validando datos básicos impositivos y de contacto.' },
  { id: 8, nombre: 'Medifé', url: 'https://www.medife.com.ar/', detalle: 'Ir a la sección "quiero ser prestador" para postularse.' },
  { id: 9, nombre: 'Omint', url: 'mailto:cgp@omint.com.ar', detalle: 'No posee enlace web directo. Enviar petición y currículum por correo electrónico.' },
  { id: 10, nombre: 'Accord Salud / Unión Personal', url: 'https://www.unionpersonal.com.ar', detalle: 'Solicitar planilla de alta por soporte en su página web.' },
  { id: 11, nombre: 'OSPe (Petroleros)', url: 'https://www.ospesalud.com.ar/prestadores/gestion-de-nuevos-prestadores/', detalle: 'Poseen un formulario web de consulta para iniciar la gestión.' },
  { id: 12, nombre: 'Jerárquicos Salud', url: 'https://www.jerarquicos.com', detalle: 'Sección prestadores. Solicitan RNP, Constancia de AFIP y CBU.' },
  
  // Regional Chubut y Patagonia
  { id: 13, nombre: 'SEROS (ISSyS - Chubut)', url: 'mailto:convenios@issys.gov.ar', detalle: 'Documentación requerida por mail oficial para convenios.' },
  { id: 14, nombre: 'Avalian', url: 'https://avalian.com', detalle: 'Formulario de contacto -> "Quiero ser prestador".' },
  { id: 15, nombre: 'ADOS Trelew', url: '', detalle: 'Trámite presencial en oficinas (28 de Julio 722, Trelew) o a través de junta local para RNP.' },
  { id: 16, nombre: 'Generar Salud (SITRAED - Chubut)', url: 'https://generarsalud.com.ar/', detalle: 'Contacto para cartilla de prestadores vinculada a Sindicatos Docentes.' },
  { id: 17, nombre: 'Caja de Servicios Sociales (CSS - Santa Cruz)', url: 'https://css.gov.ar/medios-de-contacto/', detalle: 'Contacto con Gerencia de Gestión para solicitar convenio.' },
  { id: 18, nombre: 'IPROSS (Río Negro)', url: 'https://ipross.rionegro.gov.ar', detalle: 'Ir a pestaña "Prestadores" para descargar el formulario de inscripción.' },
  { id: 19, nombre: 'ISSN (Neuquén)', url: 'https://www.issn.gov.ar', detalle: 'Sección "Guía de Trámites", el alta suele gestionarse a través del Colegio Profesional.' },

  // Colegios y Buscadores
  { id: 20, nombre: 'Colegio Médico de Puerto Madryn', url: 'https://colemedpm.com.ar', detalle: 'Registro de prestadores. Dirección: Marcos A. Zar 463.' },
  { id: 21, nombre: 'Colegio Médico del Sur de Chubut', url: 'https://colegiomedicocr.com.ar', detalle: 'Sede en Comodoro Rivadavia. Dirección: Alvear N° 392.' },
  { id: 22, nombre: 'Asociación Médica del Este del Chubut (AMECH)', url: 'https://www.amech.org.ar', detalle: 'Agrupa médicos de la zona este (Trelew/Rawson).' },
  { id: 23, nombre: 'Buscador REFES (Ministerio de Salud)', url: 'https://sisa.msal.gov.ar/sisadoc/docs/050101/refes_home.jsp', detalle: 'Base de datos nacional del Ministerio de Salud. Permite filtrar todos los centros habilitados de Chubut.' },
  { id: 24, nombre: 'Buscador SSSalud', url: 'https://www.sssalud.gob.ar/?cat=prestadores&page=buspres', detalle: 'Buscador oficial para verificar establecimientos.' }
];

export default function AltaPrestadorView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOS, setSelectedOS] = useState(null);

  const filteredOS = OBRAS_SOCIALES.filter(os => 
    os.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center mt-10">
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Requisitos para Alta de Prestador</h2>
      <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
        Busca tu Obra Social o Prepaga en la lista desplegable para acceder directamente al portal de requisitos e inscripción como prestador MAI.
      </p>

      <div className="relative max-w-md mx-auto text-left">
        <div 
          className="w-full rounded-md border border-slate-300 p-3 bg-white flex justify-between items-center cursor-pointer hover:border-indigo-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedOS ? "text-slate-900 font-medium" : "text-slate-500"}>
            {selectedOS ? selectedOS.nombre : "Seleccioná o buscá una Obra Social..."}
          </span>
          <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg">
            <div className="p-2 border-b border-slate-100">
              <input 
                type="text" 
                placeholder="Escribí para buscar (Ej: OSDE)..." 
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {filteredOS.length > 0 ? (
                filteredOS.map(os => (
                  <li 
                    key={os.id} 
                    className="px-4 py-3 hover:bg-indigo-50 cursor-pointer text-sm text-slate-700 transition-colors flex justify-between items-center group"
                    onClick={() => {
                      setSelectedOS(os);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    <span>{os.nombre}</span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-slate-500 text-center">No se encontraron resultados.</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {selectedOS && (
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md mx-auto text-left">
          <h3 className="text-lg font-bold text-indigo-900 mb-3">{selectedOS.nombre}</h3>
          
          <div className="mb-5 p-3 bg-white rounded border border-indigo-100 text-sm text-slate-700">
            <span className="font-semibold block mb-1">Información de Alta:</span>
            {selectedOS.detalle}
          </div>

          {selectedOS.url ? (
            <a 
              href={selectedOS.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {selectedOS.url.startsWith('mailto:') ? 'Enviar Correo Electrónico' : 'Ir al Portal Oficial'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          ) : (
            <div className="w-full text-center p-3 bg-slate-200 text-slate-600 rounded-lg text-sm font-medium border border-slate-300">
              Trámite Exclusivamente Presencial
            </div>
          )}
        </div>
      )}
      
      <div className="mt-12 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-400">
          * La base de datos incluye más de 300 entidades. Si no encuentras la tuya, contacta a soporte.
        </p>
      </div>
    </div>
  );
}
