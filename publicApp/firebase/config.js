import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
 apiKey: "AIzaSyACEiQSlD59bWL_MkaFfIT79iMUVKz5-6k",
  authDomain: "publicpictures-b00c2.firebaseapp.com",
  databaseURL: "https://publicpictures-b00c2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "publicpictures-b00c2",
  storageBucket: "publicpictures-b00c2.appspot.com",
  messagingSenderId: "382977634444",
  appId: "1:382977634444:web:574f8ba1bcb69897820ba9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);