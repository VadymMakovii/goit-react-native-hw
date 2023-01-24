import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCqq06Ko0d839Fe85-jHmKM-ct2mxwcK5M",
  authDomain: "publicviewapp.firebaseapp.com",
  databaseURL: "https://publicviewapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "publicviewapp",
  storageBucket: "publicviewapp.appspot.com",
  messagingSenderId: "17843230644",
  appId: "1:17843230644:web:1a2ab891f32c299ada44e1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);