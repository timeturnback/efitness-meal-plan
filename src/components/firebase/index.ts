import 'firebase/compat/firestore';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MID,
};

firebase.initializeApp(firebaseConfig);

const myFirebase = firebase;

export { myFirebase };
export { auth, db, dbg, provider };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = firebase.firestore();
const dbg = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
