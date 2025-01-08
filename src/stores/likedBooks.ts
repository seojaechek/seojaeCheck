import { likedBook } from "@/types/common";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type Containers = {
  root: likedBook[];
  container1: likedBook[];
  container2: likedBook[];
};

export type Action = {
  setItems: (container: keyof Containers, items: likedBook[]) => void;
};

export const useLikedBookStore = create<Containers & Action>()(
  persist<Containers & Action>(
    (set) => ({
      root: [],
      container1: [],
      container2: [],

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
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to rehydrate likedBookStore:", error);
        } else if (state) {
          // Check if `root` is empty and set default values
          if (state.root.length === 0) {
            state.root = [
              {
                title: "황금종이 1",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6490084%3Ftimestamp%3D20240808155121",
                isbn: "1167140729",
              },
              {
                title: "황금종이 2",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6490100%3Ftimestamp%3D20240719180658",
                isbn: "1167140737",
              },
              {
                title: "허수아비춤(양장본 HardCover)",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F589351%3Ftimestamp%3D20220930210643",
                isbn: "9788943103767",
              },
              {
                title: "한강 세트(전10권)",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1021388%3Ftimestamp%3D20221025121719",
                isbn: "8973378309",
              },
              {
                title: "태백산맥. 6: 제3부 분단과 전쟁(개정판 4판)",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1020199%3Ftimestamp%3D20221025124853",
                isbn: "9788973377992",
              },
              {
                title: "태백산맥 7: 제3부 분단과 전쟁",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1021371%3Ftimestamp%3D20231027181527",
                isbn: "9788973378005",
              },
              {
                title: "아리랑 세트(3판)(전12권)",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1019556%3Ftimestamp%3D20221025120905",
                isbn: "9788973378043",
              },
              {
                title: "태백산맥 4: 제2부 민중의 불꽃",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1018755%3Ftimestamp%3D20231102155053",
                isbn: "9788973377978",
              },
              {
                title: "정글만리 1",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F917678%3Ftimestamp%3D20240803112749",
                isbn: "9788965744023",
              },
              {
                title: "아리랑 특별한정판 핸디북 블루케이스 세트(전12권)",
                thumbnail:
                  "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5034871%3Ftimestamp%3D20221025124109",
                isbn: "9788965749608",
              },
            ];
          }
        }
      },
    } as PersistOptions<Containers & Action>,
  ),
);
