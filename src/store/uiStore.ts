import { create } from "zustand";

type UIState = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const useUIState = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
  