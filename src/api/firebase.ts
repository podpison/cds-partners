// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWUWzy_4ZQpvTxt5LZvrtkV-vHtsv4g5s",
  authDomain: "cds-partner.firebaseapp.com",
  projectId: "cds-partner",
  storageBucket: "cds-partner.appspot.com",
  messagingSenderId: "100595601937",
  appId: "1:100595601937:web:b4494757f7f4f4591757b0",
  measurementId: "G-P3MG742G9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);