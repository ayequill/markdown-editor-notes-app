// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxeHCokoJw1CLz-orCzZ0oMPwEnOnVuLI",
  authDomain: "md-notes-app.firebaseapp.com",
  projectId: "md-notes-app",
  storageBucket: "md-notes-app.appspot.com",
  messagingSenderId: "408176018072",
  appId: "1:408176018072:web:630f56ac2186349f3e06ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
const db = getFirestore(app)

const noteCollection = collection(db, "notes")

console.log(noteCollection)
