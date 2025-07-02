// src/services/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvCxeU47oYit6NwVMhm2TLN-XL80VEl2w",
  authDomain: "savs-fd9bd.firebaseapp.com",
  projectId: "savs-fd9bd",
  storageBucket: "savs-fd9bd.appspot.com",
  messagingSenderId: "745318029811",
  appId: "1:745318029811:web:900ee52c56cee95ea31a86",
  measurementId: "G-3PK3SLKL2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
