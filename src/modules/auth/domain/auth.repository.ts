import type { User } from "firebase/auth";

export interface AuthRepository {
  signIn: () => Promise<User | null>;
  signOut: () => Promise<void>;
  onAuthStateChanged: (callback: (user: User | null) => void) => () => void;
}
