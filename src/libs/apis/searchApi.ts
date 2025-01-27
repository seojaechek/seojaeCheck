import { BookResponse } from "@/types/common";
import axiosInstance from "./axiosInstance";

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
  sort: string,
): Promise<BookResponse> {
  if (!query) {
    return {
      documents: [],
      meta: { total_count: 0, pageable_count: 0, is_end: true },
    };
  }
  try {
    const { data } = await axiosInstance.get<BookResponse>("/v3/search/book", {
      params: {
        query,
        page,
        size,
        sort,
      },
    });
    return data;
  } catch (error) {
    console.error("API 요청 중 에러 발생: ", error);
    throw new Error("다시 시도해주세요!");
  }
}
