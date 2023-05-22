// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const API_KEY = import.meta.env.VITE_API_KEY
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "md-notes-app.firebaseapp.com",
  projectId: "md-notes-app",
  storageBucket: "md-notes-app.appspot.com",
  messagingSenderId: "408176018072",
  appId: "1:408176018072:web:630f56ac2186349f3e06ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const db = getFirestore(app)

export const noteCollection = collection(db, "notes")

