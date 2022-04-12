import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { firebaseConfig } from "./config";

//firebaseの初期化
const firebaseApp = initializeApp(firebaseConfig);

//分かりやすい変数に置き換えてexport
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage();
export const functions = getFunctions();
export const FirebaseTimestamp = Timestamp;
