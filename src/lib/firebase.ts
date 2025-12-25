// src/lib/firebase.ts (tạo folder lib nếu chưa có)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKdQ39rLwy6Agfd6kiPS4nLaxpQG39G7c",
  authDomain: "nora-coffee-app.firebaseapp.com",
  projectId: "nora-coffee-app",
  storageBucket: "nora-coffee-app.firebasestorage.app",
  messagingSenderId: "216325893263",
  appId: "1:216325893263:web:ea4ed8735361be1dda54fa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();