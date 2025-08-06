import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

export const useSignOut = () => {
  const { dispatch } = useContext(AuthContext);
  return {
    signOut: () => {
      dispatch({ type: "SIGN_OUT" });
    },
  };
};
