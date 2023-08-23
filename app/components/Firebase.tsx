// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtG2zmQULjj-PXGc5ERmS58USkmWH8eN8",
    authDomain: "url-preserver.firebaseapp.com",
    projectId: "url-preserver",
    storageBucket: "url-preserver.appspot.com",
    messagingSenderId: "402621082256",
    appId: "1:402621082256:web:7b226f275237c98c7dc615",
    measurementId: "G-RYWY6RJY51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, analytics, auth, db, provider };
