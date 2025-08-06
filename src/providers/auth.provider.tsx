import { useReducer, type PropsWithChildren } from "react";
import { AuthContext } from "../contexts/auth.context";
import { AuthReducer } from "../store/auth.reducer";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(AuthReducer, { state: "UNKNOWN" });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
