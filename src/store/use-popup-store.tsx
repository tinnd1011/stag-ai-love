import { create } from "zustand";

export type PopupType = "credits" | "publish" | "settings" | "stakeDetail" | "stakeLoading" | "stakeSuccess" | "stakeFail" | null;

interface PopupStore {
  isOpen: boolean;
  type: PopupType;
  open: (type: PopupType) => void;
  close: () => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
  isOpen: false,
  type: null,
  open: (type) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false, type: null }),
}));
