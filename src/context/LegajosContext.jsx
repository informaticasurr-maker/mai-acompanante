import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const LegajosContext = createContext();

export function useLegajos() {
  return useContext(LegajosContext);
}

export function LegajosProvider({ children }) {
  const { currentUser } = useAuth();
  const [legajos, setLegajos] = useState([]);
  
  const [activeLegajoId, setActiveLegajoId] = useState(() => {
    return localStorage.getItem('mai_active_legajo') || null;
  });

  useEffect(() => {
    if (activeLegajoId) {
      localStorage.setItem('mai_active_legajo', activeLegajoId);
    } else {
      localStorage.removeItem('mai_active_legajo');
    }
  }, [activeLegajoId]);

  useEffect(() => {
    if (!currentUser) {
      setLegajos([]);
      return;
    }

    const legajosRef = collection(db, 'usuarios', currentUser.uid, 'legajos');
    
    // Escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(legajosRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLegajos(data);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addLegajo = async (legajo) => {
    if (!currentUser) return;
    const newId = Date.now().toString();
    const docRef = doc(db, 'usuarios', currentUser.uid, 'legajos', newId);
    await setDoc(docRef, { ...legajo });
    
    if (!activeLegajoId) setActiveLegajoId(newId);
  };

  const updateLegajo = async (id, updatedData) => {
    if (!currentUser) return;
    const docRef = doc(db, 'usuarios', currentUser.uid, 'legajos', id);
    await setDoc(docRef, updatedData, { merge: true });
  };

  const deleteLegajo = async (id) => {
    if (!currentUser) return;
    const docRef = doc(db, 'usuarios', currentUser.uid, 'legajos', id);
    await deleteDoc(docRef);
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
