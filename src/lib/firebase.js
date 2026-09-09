import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase web configuration is intentionally public; protect data with Firestore rules.
const firebaseConfig = {
  apiKey: "AIzaSyBGIx6zBYZd9fLJJJfiVcXReK4ECPydzbU",
  authDomain: "exofters.firebaseapp.com",
  projectId: "exofters",
  storageBucket: "exofters.firebasestorage.app",
  messagingSenderId: "575915518099",
  appId: "1:575915518099:web:d1d390ddd257dce1294566",
  measurementId: "G-MHWM5RKY7B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
