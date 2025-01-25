import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  query: string;
  openDropdownId: string | null;
}

interface Action {
  setQuery: (query: string) => void;
  setOpenDropdownId: (id: string | null) => void;

  resetSearchState: () => void;
}

export const useSearchStore = create<State & Action>()(
  persist(
    (set) => ({
      query: "",
      setQuery: (query) => set({ query }),

      openDropdownId: null,
      setOpenDropdownId: (id) => set({ openDropdownId: id }),

      resetSearchState: () =>
        set({
          query: "",
          openDropdownId: null,
        }),
    }),
    {
      name: "searchInfo",
    },
  ),
);
