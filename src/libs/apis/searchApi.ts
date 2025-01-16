import { Book } from "@/types/common";
import axiosInstance from "./axiosInstance";

export interface BookResponse {
  documents: Book[];
  meta: {
    totalCount: number;
    pagealbeCount: number;
    isEnd: boolean;
  };
}

/**
 * @param query 검색어
 * @param page 페이지 (기본값 : 1)
 * @param size 페이지 크기 (기본값 : 10)
 * @param sort 정렬 (accuracy | latest)
 */

export async function getBookSearch(
  query: string,
  page: number,
  size: number = 10,
  sort: "accuracy",
): Promise<BookResponse> {
  if (!query) {
    return {
      documents: [],
      meta: { totalCount: 0, pagealbeCount: 0, isEnd: true },
    };
  }

  const { data } = await axiosInstance.get<BookResponse>("/v3/search/book", {
    params: {
      query,
      page,
      size,
      sort,
    },
  });
  return data;
}
