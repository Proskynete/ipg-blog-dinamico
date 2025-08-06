import type { AuthAction, AuthState } from "../interfaces/auth.interface";

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
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
