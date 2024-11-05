import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
  RecetaAPIResponseSchema,
} from "../utils/recetas-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  const { data } = await axios(url);
  const result = CategoriesAPIResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
}

export async function getRecetas(filter: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.categoria}&i=${filter.ingredientes}`;

  const { data } = await axios(url);

  const result = DrinksAPIResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getRecetasById(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { data } = await axios(url);

  const result = RecetaAPIResponseSchema.safeParse(data.drinks[0]);

  if (result.success) {
    return result.data;
  }
}
