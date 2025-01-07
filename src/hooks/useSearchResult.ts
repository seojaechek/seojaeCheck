"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchResult } from "@/stores/searchResult";
import { getBookSearch, BookResponse } from "@/libs/apis/searchApi";

export function useSearchResultQuery() {
  const { query } = useSearchResult();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<
    BookResponse,
    Error
  >({
    queryKey: ["searchBooks", query],
    queryFn: () => getBookSearch(query, 1, 50, "accuracy"),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
}
