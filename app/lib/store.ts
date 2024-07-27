import { create } from "zustand";

export const stateStore = create((set) => ({
  isUser: true,
  updateIsUser: () => set((state: any) => ({ isUser: !state.isUser })),
}));
