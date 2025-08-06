import { createContext } from "react";
import type { AuthState, AuthAction } from "../interfaces/auth.interface";

type AuthContextProps = {
  state: AuthState;
  dispatch: (action: AuthAction) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  state: { state: "UNKNOWN" },
  dispatch: () => {},
});
