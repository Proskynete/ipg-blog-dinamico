import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

export const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return {
    state,
  };
};
