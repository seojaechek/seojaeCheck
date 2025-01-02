import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type State = {
  root: string[];
  container1: string[];
  container2: string[];
};

export type Action = {
  /** Sets items in a single container. */
  setItems: (container: keyof State, items: string[]) => void;
  /** Optional helper if you want to set multiple containers at once. */
  setMultipleContainers?: (
    newItems: Partial<Pick<State, "root" | "container1" | "container2">>,
  ) => void;
};

export const useLikedBookStore = create<State & Action>()(
  persist<State & Action>(
    (set) => ({
      // Default values if nothing is in localStorage yet
      root: [],
      container1: [],
      container2: [],

      setItems: (container, items) => {
        set((state) => ({
          ...state,
          [container]: items,
        }));
      },

      // If you want a helper to set multiple containers at once
      setMultipleContainers: (newItems) => {
        set((state) => ({
          ...state,
          ...newItems,
        }));
      },
    }),
    {
      name: "likedBookStore",

      getStorage: () =>
        typeof window !== "undefined" ? window.localStorage : undefined,
    } as PersistOptions<State & Action>,
  ),
);
