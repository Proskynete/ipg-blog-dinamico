import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import type { AuthRepository } from "../../domain/auth.repository";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const firebaseAuthRepository: AuthRepository = {
  signIn: async () => {
    auth.languageCode = "es";
    const result = await signInWithPopup(auth, provider);
    return result.user;
  },
  signOut: async () => {
    await auth.signOut();
  },
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return auth.onAuthStateChanged((firebaseUser) => {
      const user = firebaseUser ? firebaseUser : null;
      callback(user);
    });
  },
};
