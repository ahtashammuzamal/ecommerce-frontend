import {
  getProfileApi,
  loginApi,
  logoutApi,
  registerApi,
} from "@/api/auth.api";
import { getToken, removeToken, setToken } from "@/lib/token";
import type { AuthPayload, AuthResponse, User } from "@/types";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        const res = await getProfileApi();
        setUser(res.data?.user);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const register = async (data: AuthPayload): Promise<AuthResponse> => {
    try {
      const res = await registerApi(data);
      setUser(res.data.user);
      setToken(res.data.token);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (data: AuthPayload): Promise<AuthResponse> => {
    try {
      const res = await loginApi(data);
      setUser(res.data.user);
      setToken(res.data.token);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const res = await logoutApi();
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      removeToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        register,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
