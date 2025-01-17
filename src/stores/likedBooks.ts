import { likedBook } from "@/types/common";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type Containers = {
  toRead: likedBook[];
  reading: likedBook[];
  done: likedBook[];
};

export type Action = {
  setItems: (container: keyof Containers, items: likedBook[]) => void;
};

export const useLikedBookStore = create<Containers & Action>()(
  persist<Containers & Action>(
    (set) => ({
      toRead: [],
      reading: [],
      done: [],

      setItems: (container, items) => {
        set((state) => ({
          ...state,
          [container]: items,
        }));
      },
    }),
    {
      name: "likedBookStore",

      getStorage: () =>
        typeof window !== "undefined" ? window.localStorage : undefined,
    } as PersistOptions<Containers & Action>,
  ),
);
