import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Descargar perfil de Firebase y poblar localStorage
        try {
          const docRef = doc(db, 'usuarios', user.uid, 'perfil');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.profNombre) localStorage.setItem('mai_prof_name', data.profNombre);
            if (data.profTitulo) localStorage.setItem('mai_prof_title', data.profTitulo);
            if (data.apiKey) localStorage.setItem('mai_gemini_api_key', data.apiKey);
          }
        } catch (error) {
          console.error("Error cargando perfil:", error);
        }
      } else {
        // Limpiar configuración local por seguridad
        localStorage.removeItem('mai_prof_name');
        localStorage.removeItem('mai_prof_title');
        localStorage.removeItem('mai_gemini_api_key');
      }
      
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
