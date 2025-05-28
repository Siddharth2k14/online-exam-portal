// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmEbKVilDv4PjVgJQ16YuTahBEivgtiCM",
  authDomain: "online-exam-portal-46d31.firebaseapp.com",
  projectId: "online-exam-portal-46d31",
  storageBucket: "online-exam-portal-46d31.firebasestorage.app",
  messagingSenderId: "740107769820",
  appId: "1:740107769820:web:9b9ebf86a0fef300c12119",
  measurementId: "G-23LK2VW0SC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);