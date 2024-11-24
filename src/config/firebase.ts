import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy6qmWIpXGvAOn3JwwuTAgc6kzNwDHakc",
  authDomain: "guardianai-661ca.firebaseapp.com",
  projectId: "guardianai-661ca",
  storageBucket: "guardianai-661ca.firebasestorage.app",
  messagingSenderId: "359326024272",
  appId: "1:359326024272:web:41530cbdbf4cb017e5c755",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
