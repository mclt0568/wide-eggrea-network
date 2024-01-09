import { getApp, initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef } from "firebase/database";
import { getStorage } from "firebase/storage";


// realtime database
const databaseURL = "https://wide-eggrea-network-default-rtdb.asia-southeast1.firebasedatabase.app/";
const firebaseConfig = { databaseURL };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const coverRef = dbRef(database, "cover");

// storage
const firebaseApp = getApp();
const storageURL = "gs://wide-eggrea-network.appspot.com";
export const storage = getStorage(firebaseApp, storageURL);