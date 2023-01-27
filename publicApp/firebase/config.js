import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJ1dLPGqi7yw1l89FQ2M7EFviHDnTODoo",
  authDomain: "photohub-2b74b.firebaseapp.com",
  databaseURL: "https://photohub-2b74b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "photohub-2b74b",
  storageBucket: "photohub-2b74b.appspot.com",
  messagingSenderId: "633366405427",
  appId: "1:633366405427:web:4d6cf71fe75a7d1f85de46"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);