import { ROLE } from "./enums";

export interface User {
  id: number;
  name: string;
  email: string;
  role: ROLE;
  createdAt: string;
  updatedAt: string;
}

export type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

export type AuthResponse = {
  message: string;
  user: User;
  token: string;
};

export type LogoutResponse = {
  message: string;
  user: User | null;
};
