import type { AuthPayload, AuthResponse, LogoutResponse, User } from "@/types";
import React, { createContext, useContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  register: (data: AuthPayload) => Promise<AuthResponse>;
  login: (data: AuthPayload) => Promise<AuthResponse>;
  logout: () => Promise<LogoutResponse>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};
