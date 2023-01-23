import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvMH-oEMpWflSfLpr8y0Cp00etDW8Rvr0",
  authDomain: "publicview-fb560.firebaseapp.com",
  databaseURL: "https://publicview-fb560-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "publicview-fb560",
  storageBucket: "publicview-fb560.appspot.com",
  messagingSenderId: "69220579477",
  appId: "1:69220579477:web:bb19954dc47525d508839c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);