import { createContext, useReducer } from "react";
import { loginReducer } from "../stores/login/loginReducer";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
