import type { User } from "@/types";
import { api } from "./axios";

export const registerApi = (data: User) => api.post("/register", data);
export const loginApi = (data: User) => api.post("/login", data);
export const getProfileApi = () => api.get("/my-profile");
export const logout = () => api.post("/logout");
