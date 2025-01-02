import { create } from "zustand";

interface StakeData {
  amount: string;
  isLoading: boolean;
  txHash ?: string;
}

interface StakeState extends StakeData {
  setField: (field: keyof StakeData, value: any) => void;
  setStakeData: (data: StakeData) => void;
  reset: () => void;
}

const initialState: StakeData = {
  amount: "",
  isLoading: false,
  txHash: "",
};


export const useStakeStore = create<StakeState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setStakeData: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set(initialState),
}));