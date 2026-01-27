import { ROLE } from "./enums";

export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role?: ROLE;
  createdAt?: string;
}
