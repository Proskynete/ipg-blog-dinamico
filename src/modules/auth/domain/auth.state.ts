import type { User } from "firebase/auth";

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
