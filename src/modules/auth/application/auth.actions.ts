import type { User } from "firebase/auth";

export type AuthAction =
  | { type: "SIGN_IN"; payload: { user: User } }
  | { type: "SIGN_OUT" };
