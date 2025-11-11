// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCb9w2ZMcSODRN97JvDFhibO-pJFwlNY7E",
    authDomain: "aiml-be34b.firebaseapp.com",
    projectId: "aiml-be34b",
    storageBucket: "aiml-be34b.firebasestorage.app",
    messagingSenderId: "1042594384829",
    appId: "1:1042594384829:web:93306b4a88229fa71a20d4",
    measurementId: "G-Y7T831NVK5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
