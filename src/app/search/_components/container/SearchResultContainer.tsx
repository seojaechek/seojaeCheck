"use client";

import BookListSkeleton from "../BookListSkeleton";
import SearchResultUI from "../presentation/SearchResultUI";

import { useModalStore } from "@/stores/modal";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import { useSearchStore } from "@/stores/searchStore";

interface ContainerProps {
  query: string;
}

export default function SearchResultContainer({ query }: ContainerProps) {
  const { currentPage } = useSearchStore();
  // 검색 API 호출, 모달 스토어
  const { data, isLoading, isFetching } = useSearchBooks(query, currentPage);

  const { isOpen: isModalOpen } = useModalStore();

  // 검색어가 없을 때
  if (!query) {
    return <p className="mt-4 text-4xl font-black">검색어가 없습니다.</p>;
  }
  // 로딩 중
  if (isLoading || isFetching) {
    return <BookListSkeleton />;
  }
  // query에 맞는 결과가 없을 때
  if (!data || data.documents.length === 0) {
    return <p className="mt-4 text-4xl font-black">검색 결과가 없습니다.</p>;
  }

  const allDocs = data?.documents ?? [];

  return <SearchResultUI allDocs={allDocs} isModalOpen={isModalOpen} />;
}
