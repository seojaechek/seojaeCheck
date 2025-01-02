import { create } from "zustand";

interface State {
  query: string;
}

interface Action {
  setQuery: (query: string) => void;
}

export const useSearchResult = create<State & Action>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
