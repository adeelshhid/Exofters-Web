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
// The Exofters project was provisioned with a named `default` database (rather
// than Firebase's conventional `(default)` database). An environment override
// keeps the integration portable for staging or future projects.
const databaseId = process.env.REACT_APP_FIRESTORE_DATABASE_ID || "default";
export const db = getFirestore(app, databaseId);
export const storage = getStorage(app);
