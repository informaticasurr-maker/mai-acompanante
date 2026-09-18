import React from 'react';
import { useLegajos } from '../context/LegajosContext';

export default function Layout({ children, currentView, setCurrentView }) {
  const { legajos, activeLegajoId, setActiveLegajoId } = useLegajos();

  const navItemClass = (viewName) => `
    cursor-pointer px-4 py-2 font-medium transition-colors
    ${currentView === viewName 
      ? 'text-indigo-600 border-b-2 border-indigo-600' 
      : 'text-slate-600 hover:text-indigo-500'}
  `;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 border-b border-slate-100">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentView('dashboard')}
            >
              <img 
                src="/logo.png" 
                alt="Logo MAI" 
                className="w-12 h-12 object-contain drop-shadow-sm"
              />
              <h1 className="text-xl font-bold text-slate-900">MAI Assistant</h1>
            </div>
            
            {/* Controles de Sesión */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide hidden sm:inline">Alumno:</span>
                <select 
                  value={activeLegajoId || ''} 
                  onChange={(e) => setActiveLegajoId(e.target.value)}
                  className="bg-slate-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 text-sm rounded-md font-medium text-slate-700 p-1.5"
                >
                  <option value="" disabled>Seleccionar...</option>
                  {legajos.map(l => (
                    <option key={l.id} value={l.id}>{l.pacNombre}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={() => setCurrentView('config')}
                className={`p-2 rounded-md transition-colors ${currentView === 'config' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'}`}
                title="Configuración del Sistema"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
          </div>
          <nav className="flex gap-6 overflow-x-auto whitespace-nowrap">
            <span onClick={() => setCurrentView('dashboard')} className={navItemClass('dashboard')}>Dashboard</span>
            <span onClick={() => setCurrentView('adecuaciones')} className={navItemClass('adecuaciones')}>Adecuaciones</span>
            <span onClick={() => setCurrentView('contratos')} className={navItemClass('contratos')}>Contratos</span>
            <span onClick={() => setCurrentView('presupuestos')} className={navItemClass('presupuestos')}>Presupuestos</span>
            <span onClick={() => setCurrentView('planillas')} className={navItemClass('planillas')}>Planillas</span>
            <span onClick={() => setCurrentView('alta')} className={navItemClass('alta')}>Alta O.S.</span>
            <span onClick={() => setCurrentView('legajos')} className={navItemClass('legajos')}>Legajos</span>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-500">
          Agente MAI &copy; {new Date().getFullYear()} - Herramienta de Apoyo a la Inclusión
        </div>
      </footer>
    </div>
  );
}
