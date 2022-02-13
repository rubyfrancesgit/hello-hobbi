import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCa9qQnqpmd6rLgaB2aFpwBB86blZFqY6Q",
    authDomain: "hello-hobbi.firebaseapp.com",
    projectId: "hello-hobbi",
    storageBucket: "hello-hobbi.appspot.com",
    messagingSenderId: "932015785484",
    appId: "1:932015785484:web:87801811be082e1f549029"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);