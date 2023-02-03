import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA1PbQzefJ7OHwXrabL9k9ZO4wlETKx4zk",
  authDomain: "photohubview.firebaseapp.com",
  databaseURL: "https://photohubview-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "photohubview",
  storageBucket: "photohubview.appspot.com",
  messagingSenderId: "1027856164514",
  appId: "1:1027856164514:web:965ed94a2000291dd9d9fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);