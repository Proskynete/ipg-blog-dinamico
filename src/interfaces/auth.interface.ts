import type { User } from "firebase/auth";

export type AuthAction =
  | { type: "SIGN_IN"; payload: { user: User } }
  | { type: "SIGN_OUT" };

export type AuthState =
  | {
      state: "SIGNED_IN";
      currentUser: User;
    }
  | {
      state: "SIGNED_OUT";
    }
  | {
      state: "UNKNOWN";
    };
