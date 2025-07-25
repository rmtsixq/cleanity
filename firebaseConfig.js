// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBujRcE0V1PtE65fFaZ6FO4O_PRdIz7_N0",
  authDomain: "bensende-e7507.firebaseapp.com",
  databaseURL: "https://bensende-e7507-default-rtdb.firebaseio.com",
  projectId: "bensende-e7507",
  storageBucket: "bensende-e7507.firebasestorage.app",
  messagingSenderId: "935368276799",
  appId: "1:935368276799:web:94ec5d1b08734dfadcb18a",
  measurementId: "G-BQQVZ2X1GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 