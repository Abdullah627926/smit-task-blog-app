import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCxwureiWp7oZxHWadblT-Gcj8a_BfZsoc",
    authDomain: "saylani-hacaton.firebaseapp.com",
    projectId: "saylani-hacaton",
    storageBucket: "saylani-hacaton.appspot.com",
    messagingSenderId: "41952755492",
    appId: "1:41952755492:web:c92383f27cf239e1e67db1",
    measurementId: "G-QQP1Z0QCRV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);