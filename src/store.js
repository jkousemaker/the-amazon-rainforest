import { create } from "zustand";

export const useStore = create((set) => ({
  introLoaded: false,
  loaded: false,
  intro: true,
  audioMuted: false,

  setIntroLoaded: () => set(() => ({ introLoaded: true })),
  setLoaded: () => set(() => ({ loaded: true })),
  setIntro: () => set((state) => ({ intro: !state.intro })),
  setAudioMuted: () => set((state) => ({ audioMuted: !state.audioMuted })),
}));
