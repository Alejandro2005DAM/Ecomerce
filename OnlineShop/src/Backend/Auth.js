// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBosgO-ideZFMkVejO4s7nWdLmyFacoqXg",
  authDomain: "tienda-7dd05.firebaseapp.com",
  projectId: "tienda-7dd05",
  storageBucket: "tienda-7dd05.firebasestorage.app",
  messagingSenderId: "1066445022030",
  appId: "1:1066445022030:web:77f8f083fa5dcbe845741f",
  measurementId: "G-X2EC6JXDYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db= getFirestore(app)