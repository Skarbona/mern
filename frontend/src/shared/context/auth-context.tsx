import { createContext } from "react";

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  login: () => {},
  userId: null,
  logout: () => {}
});

interface IAuthContext {
  isLoggedIn: boolean;
  login(userId: string): void;
  userId: string | null;
  logout(): void;
}
