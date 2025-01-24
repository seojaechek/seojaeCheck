import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  query: string;
  currentPage: number;
  openDropdownId: string | null;
}

interface Action {
  setQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
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

      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),

      resetSearchState: () =>
        set({
          query: "",
          currentPage: 1,
          openDropdownId: null,
        }),
    }),
    {
      name: "searchInfo",
    },
  ),
);
