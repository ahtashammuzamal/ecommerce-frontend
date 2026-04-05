import type { Category } from "@/types";
import { api } from "./axios";

export const getCategoriesApi = () =>
  api.get<{ categories: Category[] }>("/categories");
