import { createContext } from "react";

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  login: () => {},
  userId: null,
  logout: () => {},
  token: null
});

interface IAuthContext {
  isLoggedIn: boolean;
  login(userId: string, token: string, expirationDate?: any): void;
  userId: string | null;
  logout(): void;
  token: string | null;
}
