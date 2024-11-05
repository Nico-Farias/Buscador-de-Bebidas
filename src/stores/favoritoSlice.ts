import { StateCreator } from "zustand";
import { RecetaById } from "../types";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export type FavoritosSliceType = {
  favoritos: RecetaById[];
  handleClickFavoritos: (receta: RecetaById) => void;
  favoritoExiste: (id: RecetaById["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritosSlice: StateCreator<
  FavoritosSliceType & NotificationSliceType,
  [],
  [],
  FavoritosSliceType
> = (set, get, api) => ({
  favoritos: [],
  handleClickFavoritos: (receta) => {
    if (get().favoritoExiste(receta.idDrink)) {
      set((state) => ({
        favoritos: state.favoritos.filter(
          (favorito) => favorito.idDrink !== receta.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotication({
        text: "Se elimino de favoritos",
        error: false,
      });
    } else {
      set((state) => ({
        favoritos: [...state.favoritos, receta],
      }));
      createNotificationSlice(set, get, api).showNotication({
        text: "Se agrego a favoritos",
        error: false,
      });
    }
    localStorage.setItem("favoritos", JSON.stringify(get().favoritos));
  },
  favoritoExiste: (id) => {
    return get().favoritos.some((favorito) => favorito.idDrink === id);
  },
  loadFromStorage: () => {
    const storageFavoritos = localStorage.getItem("favoritos");
    if (storageFavoritos) {
      set({
        favoritos: JSON.parse(storageFavoritos),
      });
    }
  },
});
