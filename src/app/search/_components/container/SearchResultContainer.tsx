"use client";

import { useModalStore } from "@/stores/modal";
import { BookResponse } from "@/types/common";
import SearchResultUI from "../presentation/SearchResultUI";

interface ContainerProps {
  query: string;
  page: number;
  searchData: BookResponse;
}

export default function SearchResultContainer({
  query,
  page,
  searchData,
}: ContainerProps) {
  const { documents, meta } = searchData;
  const { isOpen: isModalOpen } = useModalStore();

  // 검색어가 없을 때
  if (!query) {
    return <p className="mt-4 text-4xl font-black">검색어가 없습니다.</p>;
  }

  // query에 맞는 결과가 없을 때
  if (documents.length === 0) {
    return <p className="mt-4 text-4xl font-black">검색 결과가 없습니다.</p>;
  }

  return (
    <SearchResultUI
      allDocs={documents}
      currentPageNum={page}
      meta={meta}
      isModalOpen={isModalOpen}
    />
  );
}
