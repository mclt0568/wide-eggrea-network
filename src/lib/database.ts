import { getApp, initializeApp, type FirebaseApp } from "firebase/app";
import { getDatabase, ref as dbRef } from "firebase/database";
import { CollectionReference, collection, getFirestore, type DocumentData, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
try{
  app = initializeApp(firebaseConfig);
} catch (e) {
  app = getApp();
}

// realtime database
const database = getDatabase(app);
export const coverRef = dbRef(database, "cover");

// storage
export const storage = getStorage(app);

// firestore
const firestore = getFirestore(app);
export const blogsRef = collection(firestore, "blogPosts");
export async function listDocuments(path: string){
  const snapshot = await getDocs(collection(firestore, path));
  let result: {[key: string]: any} = {};
  snapshot.forEach(doc => {
    result[doc.id] = doc.data();
  })
  return result;
}