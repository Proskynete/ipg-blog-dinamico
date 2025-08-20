import { createContext } from "react";
import type { AuthState } from "../../../domain/auth.state";
import type { AuthAction } from "../../../application/auth.actions";

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
