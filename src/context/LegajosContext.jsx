import React, { createContext, useContext, useState, useEffect } from 'react';

const LegajosContext = createContext();

export function useLegajos() {
  return useContext(LegajosContext);
}

export function LegajosProvider({ children }) {
  const [legajos, setLegajos] = useState(() => {
    const saved = localStorage.getItem('mai_legajos');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        pacNombre: 'Mateo González',
        pacDni: '55.123.456',
        pacObraSocial: 'OSDE',
        pacAfiliado: '123456789-01',
        institucion: 'Colegio San José',
        diagnostico: 'Dislexia',
        perfil: 'Dificultad en lectura fluida. Se beneficia de textos con fuente grande, interlineado amplio y viñetas cortas.'
      }
    ]; // Dummy inicial
  });

  const [activeLegajoId, setActiveLegajoId] = useState(() => {
    return localStorage.getItem('mai_active_legajo') || null;
  });

  useEffect(() => {
    localStorage.setItem('mai_legajos', JSON.stringify(legajos));
  }, [legajos]);

  useEffect(() => {
    if (activeLegajoId) {
      localStorage.setItem('mai_active_legajo', activeLegajoId);
    } else {
      localStorage.removeItem('mai_active_legajo');
    }
  }, [activeLegajoId]);

  const addLegajo = (legajo) => {
    const newLegajo = { ...legajo, id: Date.now().toString() };
    setLegajos([...legajos, newLegajo]);
    if (!activeLegajoId) setActiveLegajoId(newLegajo.id);
  };

  const updateLegajo = (id, updatedData) => {
    setLegajos(legajos.map(l => l.id === id ? { ...l, ...updatedData } : l));
  };

  const deleteLegajo = (id) => {
    setLegajos(legajos.filter(l => l.id !== id));
    if (activeLegajoId === id) setActiveLegajoId(null);
  };

  const activeLegajo = legajos.find(l => l.id === activeLegajoId) || null;

  return (
    <LegajosContext.Provider value={{
      legajos,
      activeLegajoId,
      setActiveLegajoId,
      activeLegajo,
      addLegajo,
      updateLegajo,
      deleteLegajo
    }}>
      {children}
    </LegajosContext.Provider>
  );
}
