import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import type { User } from "firebase/auth";

export const useSignIn = () => {
  const { dispatch } = useContext(AuthContext);
  return {
    signIn: (user: User) => {
      dispatch({ type: "SIGN_IN", payload: { user } });
    },
  };
};
