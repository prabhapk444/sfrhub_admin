// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNZ9b-w1Bx22ePtJpVmXSBv-fb7wtOOu8",
  authDomain: "sfr-esevai.firebaseapp.com",
  projectId: "sfr-esevai",
  storageBucket: "sfr-esevai.firebasestorage.app",
  messagingSenderId: "38792347533",
  appId: "1:38792347533:web:2a938abcaa50941d4707c4",
  measurementId: "G-PBN2EWN8BZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);