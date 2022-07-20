//! Rename this file to firebaseCfg.js and fill in your settings

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "__YOUR_API_KEY__",
  authDomain: "__YOUR_HOST_DOMAIN__",
  projectId: "__YOUR_PROJECT_ID__",
  storageBucket: "__YOUR_STORAGE_BUCKET__",
  messagingSenderId: "__SENDER_ID",
  appId: "__APP_ID__",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
