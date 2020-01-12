import { createContext } from "react";

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

interface IAuthContext {
  isLoggedIn: boolean;
  login(): void;
  logout(): void;
}
