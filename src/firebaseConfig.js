// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKui23ocz4UzPbfMyp9fX2nJSBy_lniuE",
  authDomain: "calculadora-nutricional-b3720.firebaseapp.com",
  projectId: "calculadora-nutricional-b3720",
  storageBucket: "calculadora-nutricional-b3720.appspot.com",
  messagingSenderId: "875880700168",
  appId: "1:875880700168:web:1ccb5f8b8fb3c783a874bd",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
