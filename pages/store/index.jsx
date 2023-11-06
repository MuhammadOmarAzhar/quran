import {create} from 'zustand';

const initialState = {
  surahNameStore: '',
  translationStore: '',
  ayahStore: [],
};

export const useStore = create((set) => ({
  ...initialState,

  setSurahNameStore: (surahNameStore) => set({surahNameStore}),
  setTranslationStore: (translationStore) => set({translationStore}),
  setAyahStore: (ayahStore) => set({ayahStore}),

  cleanup: () => set(initialState),
}));
