import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  query: string;
  currentPage: number;
  openDropDownId: string | null;
}

interface Action {
  setQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setOpenDropDownId: (id: string | null) => void;

  resetSearchState: () => void;
}

export const useSearchStore = create<State & Action>()(
  persist(
    (set) => ({
      query: "",
      setQuery: (query) => set({ query }),

      openDropDownId: null,
      setOpenDropDownId: (id) => set({ openDropDownId: id }),

      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),

      resetSearchState: () =>
        set({
          query: "",
          currentPage: 1,
          openDropDownId: null,
        }),
    }),
    {
      name: "searchInfo",
    },
  ),
);
