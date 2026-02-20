import type { AuthPayload, AuthResponse, LogoutResponse, User } from "@/types";
import { api } from "./axios";

export const registerApi = (data: AuthPayload) =>
  api.post<AuthResponse>("/auth/register", data);

export const loginApi = (data: AuthPayload) =>
  api.post<AuthResponse>("/auth/login", data);

export const getProfileApi = () => api.get<User>("/auth/my-profile");

export const logoutApi = () => api.post<LogoutResponse>("/auth/logout");
