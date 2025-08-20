import type { AuthState } from "../domain/auth.state";
import type { AuthAction } from "./auth.actions";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        state: "SIGNED_IN",
        currentUser: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        state: "SIGNED_OUT",
      };
    default:
      return state;
  }
};
