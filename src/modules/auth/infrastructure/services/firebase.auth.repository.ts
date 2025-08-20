import { signInWithPopup, GoogleAuthProvider, type User } from "firebase/auth";
import type { AuthRepository } from "../../domain/auth.repository";
import { firebaseAuth } from "../../../../helpers/firebase.helper";

export const firebaseAuthRepository: AuthRepository = {
  signIn: async () => {
    const provider = new GoogleAuthProvider();
    firebaseAuth.languageCode = "es";

    const result = await signInWithPopup(firebaseAuth, provider);
    return result.user;
  },
  signOut: async () => {
    await firebaseAuth.signOut();
  },
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const user = firebaseUser ? firebaseUser : null;
      callback(user);
    });
  },
};
