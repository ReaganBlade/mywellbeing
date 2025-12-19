import { create } from "zustand";

type UsageState = {
  isLoading: boolean;

  setIsLoading: (value: boolean) => void;
};

export const useUsageStore = create<UsageState>((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));
