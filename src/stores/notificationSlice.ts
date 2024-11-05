import { StateCreator } from "zustand";
import { FavoritosSliceType } from "./favoritoSlice";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notificacion: Notification;
  showNotication: (payload: Pick<Notification, "text" | "error">) => void;
  hideNotification: () => void;
};

export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoritosSliceType,
  [],
  [],
  NotificationSliceType
> = (set, get) => ({
  notificacion: {
    text: "",
    error: false,
    show: false,
  },
  showNotication: (payload) => {
    set({
      notificacion: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });
    setTimeout(() => {
      get().hideNotification();
    }, 3000);
  },
  hideNotification: () => {
    set({
      notificacion: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
