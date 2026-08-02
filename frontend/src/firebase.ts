// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoul_zbFkpfqMcItk60ttshLUmoWPmsq8",
  authDomain: "retail-sales-ai-dashboard.firebaseapp.com",
  projectId: "retail-sales-ai-dashboard",
  storageBucket: "retail-sales-ai-dashboard.firebasestorage.app",
  messagingSenderId: "935818045286",
  appId: "1:935818045286:web:0d8e8b14d08d673ec10aa7",
  measurementId: "G-W5RRVTG5GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
