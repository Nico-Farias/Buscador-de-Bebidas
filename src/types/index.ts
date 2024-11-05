import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  DrinkAPIResponse,
  DrinksAPIResponse,
  RecetaAPIResponseSchema,
  SearchFilterSchema,
} from "../utils/recetas-schema";

export type Category = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponse>;
export type Drink = z.infer<typeof DrinkAPIResponse>;
export type RecetaById = z.infer<typeof RecetaAPIResponseSchema>;
