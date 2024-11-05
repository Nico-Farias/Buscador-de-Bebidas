import { StateCreator } from "zustand";
import {
  getCategories,
  getRecetas,
  getRecetasById,
} from "../services/RecetaService";
import { Category, Drink, Drinks, RecetaById, SearchFilter } from "../types";

export type RecetaSliceType = {
  categorias: Category;
  drinks: Drinks;
  selectedReceta: RecetaById;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecetas: (searchFilter: SearchFilter) => Promise<void>;
  selectReceta: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecetaSlice: StateCreator<RecetaSliceType> = (set) => ({
  categorias: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectedReceta: {} as RecetaById,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();

    set({
      categorias: categories,
    });
  },
  searchRecetas: async (searchFilter) => {
    const drinks = await getRecetas(searchFilter);
    set({
      drinks: drinks,
    });
  },

  selectReceta: async (id) => {
    const selectedReceta = await getRecetasById(id);
    set({
      selectedReceta,
      modal: true,
    });
  },
  closeModal: () => {
    set({
      modal: false,
      selectedReceta: {} as RecetaById,
    });
  },
});
