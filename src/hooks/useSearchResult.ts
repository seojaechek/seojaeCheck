"use client";

import useDebounce from "./useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useSearchResult } from "@/stores/searchResult";
import { getBookSearch, BookResponse } from "@/libs/apis/searchApi";

export function useSearchResultQuery() {
  const { query } = useSearchResult();
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<
    BookResponse,
    Error
  >({
    queryKey: ["searchBooks", debouncedQuery],
    queryFn: () => getBookSearch(debouncedQuery, 1, 50, "accuracy"),
    enabled: debouncedQuery.length > 0,
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
