// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blog-app-52f4e.firebaseapp.com",
  projectId: "blog-app-52f4e",
  storageBucket: "blog-app-52f4e.appspot.com",
  messagingSenderId: "887980914077",
  appId: "1:887980914077:web:a2d6bfe1758679a1882b74",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
