// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2bRI4RP_b31Qv9rCrxbWuv8CuiE5XdcI",
    authDomain: "geardepo-470a5.firebaseapp.com",
    projectId: "geardepo-470a5",
    storageBucket: "geardepo-470a5.appspot.com",
    messagingSenderId: "520050268060",
    appId: "1:520050268060:web:c82912faa7999dfaf65a59",
    measurementId: "G-BHJXEN00L5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();