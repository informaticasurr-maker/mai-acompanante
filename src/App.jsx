import React, { useState } from 'react';
import Layout from './components/Layout';
import AdecuacionView from './components/AdecuacionView';
import ContratosView from './components/ContratosView';
import PresupuestoView from './components/PresupuestoView';
import PlanillaView from './components/PlanillaView';
import AltaPrestadorView from './components/AltaPrestadorView';
import LegajosView from './components/LegajosView';
import ConfigView from './components/ConfigView';
import LoginView from './components/LoginView';
import { useAuth } from './context/AuthContext';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      
      {currentView === 'dashboard' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center max-w-4xl mx-auto mt-10">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Bienvenida al Entorno MAI</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Este es tu nuevo espacio de trabajo. Desde aquí podrás generar adecuaciones curriculares con inteligencia artificial, confeccionar contratos profesionales, generar presupuestos y armar planillas de asistencia automáticamente.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button onClick={() => setCurrentView('adecuaciones')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-2 rounded-lg transition-colors flex items-center justify-center text-sm">
              Adaptar Tarea
            </button>
            <button onClick={() => setCurrentView('contratos')} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-2 rounded-lg transition-colors flex items-center justify-center text-sm">
              Contratos
            </button>
            <button onClick={() => setCurrentView('presupuestos')} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-2 rounded-lg transition-colors flex items-center justify-center text-sm">
              Presupuestos
            </button>
            <button onClick={() => setCurrentView('planillas')} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-2 rounded-lg transition-colors flex items-center justify-center text-sm">
              Planillas
            </button>
            <button onClick={() => setCurrentView('alta')} className="bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-medium py-2 px-2 rounded-lg transition-colors flex items-center justify-center text-sm">
              Alta O.S.
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Recursos Útiles</h3>
            <div className="flex flex-col gap-3 items-center">
              <a 
                href="https://www.sssalud.gob.ar/index.php?page=integracion&utm_source=gemini" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors w-full md:w-auto text-sm font-medium border border-blue-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Consulta de Fondos SSSalud (Mecanismo Integración)
              </a>
            </div>
          </div>
        </div>
      )}

      {currentView === 'adecuaciones' && <AdecuacionView />}
      {currentView === 'contratos' && <ContratosView />}
      {currentView === 'presupuestos' && <PresupuestoView />}
      {currentView === 'planillas' && <PlanillaView />}
      {currentView === 'alta' && <AltaPrestadorView />}
      {currentView === 'legajos' && <LegajosView />}
      {currentView === 'config' && <ConfigView />}

    </Layout>
  );
}

export default App;
