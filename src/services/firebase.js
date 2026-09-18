import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfGbxe43fcSU8so7X2y072T-yY7eNXiGs",
  authDomain: "maia-asistenteapp.firebaseapp.com",
  projectId: "maia-asistenteapp",
  storageBucket: "maia-asistenteapp.firebasestorage.app",
  messagingSenderId: "112644282634",
  appId: "1:112644282634:web:d34d80c7d6ab9cb99f42f3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
