import { create } from "zustand";
import { createRecetaSlice, RecetaSliceType } from "./recetaSlice";
import { devtools } from "zustand/middleware";
import { createFavoritosSlice, FavoritosSliceType } from "./favoritoSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export const useAppStore = create<
  RecetaSliceType & FavoritosSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecetaSlice(...a),
    ...createFavoritosSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
