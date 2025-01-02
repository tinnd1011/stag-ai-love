import { create } from "zustand";

interface DeploymentPendingStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useDeploymentPendingStore = create<DeploymentPendingStore>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  })
);
