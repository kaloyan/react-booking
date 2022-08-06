// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDcspbJrX4d6noferrFVNEdjx3pIcN3EWc",
  authDomain: "reactbooking-app.firebaseapp.com",
  projectId: "reactbooking-app",
  storageBucket: "reactbooking-app.appspot.com",
  messagingSenderId: "290569081848",
  appId: "1:290569081848:web:77c62b2c7702680ebefc0d",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
