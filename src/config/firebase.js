// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_-z7vavUXJQlqGoJAhbNUEgZ_cFKkeX4",
    authDomain: "contact-app-644ef.firebaseapp.com",
    projectId: "contact-app-644ef",
    storageBucket: "contact-app-644ef.appspot.com",
    messagingSenderId: "1057172172484",
    appId: "1:1057172172484:web:53baefdf7b7071a09f2391"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);