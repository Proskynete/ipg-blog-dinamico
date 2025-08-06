import { useReducer, useEffect, type PropsWithChildren } from "react";
import { AuthContext } from "../context/auth.context";
import { authReducer } from "../../../application/auth.reducer";
import { firebaseAuthRepository } from "../../services/firebase.auth.repository";
import type { AuthRepository } from "../../../domain/auth.repository";

const initialState = { state: "UNKNOWN" as const };

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const authRepository: AuthRepository = firebaseAuthRepository;

  useEffect(() => {
    const unsubscribe = authRepository.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "SIGN_IN", payload: { user } });
      } else {
        dispatch({ type: "SIGN_OUT" });
      }
    });
    return () => unsubscribe();
  }, [authRepository]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
