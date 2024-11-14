import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    return { app, auth, db };
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    throw error;
  }
};

export const getFirebaseAuth = () => {
  if (!auth) {
    const { auth: newAuth } = initializeFirebase();
    return newAuth;
  }
  return auth;
};

export const getFirebaseDb = () => {
  if (!db) {
    const { db: newDb } = initializeFirebase();
    return newDb;
  }
  return db;
};

export const getFirebaseApp = () => {
  if (!app) {
    const { app: newApp } = initializeFirebase();
    return newApp;
  }
  return app;
};
