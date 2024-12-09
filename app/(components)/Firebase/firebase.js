// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
  } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";

//Initialization
const firebaseConfig = {
  apiKey: "AIzaSyB7cm6YonxBcOO1xT7NCs-L5MCLLHhxYU0",
  authDomain: "passwordlocker-12fcb.firebaseapp.com",
  projectId: "passwordlocker-12fcb",
  storageBucket: "passwordlocker-12fcb.firebasestorage.app",
  messagingSenderId: "848700742319",
  appId: "1:848700742319:web:0a58e8a49d5c7ce79ad25a"
};
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
