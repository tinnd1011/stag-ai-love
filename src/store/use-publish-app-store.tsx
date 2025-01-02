import { create } from "zustand";

interface PublishData {
  id: string;
  title: string;
  description: string;
  categories: string[];
  imgUrl: string;
  isPublished: boolean;
}

interface PublishState extends PublishData {
  setField: (field: keyof PublishData, value: any) => void;
  setPublishData: (data: PublishData) => void;
  reset: () => void;
}

const initialState: PublishData = {
  id: "",
  title: "",
  description: "",
  categories: [],
  imgUrl: "",
  isPublished: false,
};

export const usePublishStore = create<PublishState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setPublishData: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set(initialState),
}));
