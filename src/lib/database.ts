import { getApp, initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import { getDatabase, ref as dbRef } from "firebase/database";
import { collection, getFirestore, getDocs, type DocumentData } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// firebase app
const firebaseConfig = {
  apiKey: "AIzaSyDKCNL2PkGqVO41TNgtBNLEsJApeSHHMzo",
  authDomain: "wide-eggrea-network.firebaseapp.com",
  databaseURL: "https://wide-eggrea-network-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wide-eggrea-network",
  storageBucket: "wide-eggrea-network.appspot.com",
  messagingSenderId: "910746601254",
  appId: "1:910746601254:web:3d40267cc483cb43daa3e7"
};

let app;
try {
  app = getApp();
} catch (e) {
  app = initializeApp(firebaseConfig);
}

// realtime database
const database = getDatabase(app);
export const coverRef = dbRef(database, "cover");

// storage
export const storage = getStorage(app);

// firestore
const firestore = getFirestore(app);
export const blogPostsRef = collection(firestore, "blogPosts");
export async function getMarkers(collection: string){
  const snapshot = await getDocs(blogPostsRef);
  let result: {[key: string]: DocumentData} = {};
  snapshot.forEach(doc => {
    result[doc.id] = doc.data();
  });
  return result;
}