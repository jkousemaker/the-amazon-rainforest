import { create } from "zustand";

export const useStore = create((set) => ({
  introLoaded: false,
  loaded: false,
  intro: true,

  setIntroLoaded: () => set(() => ({ introLoaded: true })),
  setLoaded: () => set(() => ({ loaded: true })),
  setIntro: () => set((state) => ({ intro: !state.intro })),
}));
