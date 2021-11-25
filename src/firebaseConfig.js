// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl1MkdBHaTl_FjY6JjPvi6fmBb-iw2F9k",
  authDomain: "calculadora-nutricional-2974c.firebaseapp.com",
  projectId: "calculadora-nutricional-2974c",
  storageBucket: "calculadora-nutricional-2974c.appspot.com",
  messagingSenderId: "199309007730",
  appId: "1:199309007730:web:5f7ea65720273f520f9beb",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
