"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookSearch } from "@/libs/apis/searchApi";
import { BookResponse } from "@/types/common";

export function useSearchBooks(query: string, page: number) {
  return useQuery<BookResponse, Error>({
    queryKey: ["searchBooks", query, page],
    queryFn: () => {
      // query가 빈 문자열이라면 빈 결과 반환
      if (!query) {
        return Promise.resolve({
          documents: [],
          meta: { totalCount: 0, pagealbeCount: 0, isEnd: true },
        });
      }

      return getBookSearch(query, page, 20, "accuracy");
    },

    // 검색어가 없을 때 API 호출 방지 옵션
    enabled: Boolean(query),
    staleTime: 1000 * 60 * 5,
  });
}
