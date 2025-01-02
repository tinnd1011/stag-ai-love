import { create } from "zustand";

interface UserInfo {
  address: string;
  name: string;
  credits: number;
  remainCredits: number;
}

interface UserStore {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  updateUserInfo: (info: Partial<UserInfo>) => void;
  deleteUserInfo: () => void;
  logOut: () => void;
  getUserInfo: () => UserInfo | null;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userInfo: null,
  setUserInfo: (info) => {
    set({ userInfo: info });
  },

  updateUserInfo: (info) =>
    set((state) => ({
      userInfo: state.userInfo
        ? {
            ...state.userInfo,
            ...info,
          }
        : null,
    })),

  deleteUserInfo: () => set({ userInfo: null }),

  logOut: () => {
    set({ userInfo: null });
  },
  getUserInfo: () => get().userInfo,
}));
