"use client";

import { useSearchBooks } from "@/hooks/useSearchBooks";
import BookListSkeleton from "../BookListSkeleton";

import { useModalStore } from "@/stores/modal";
import { useLikedBookStore } from "@/stores/likedBooks";
import { useState } from "react";
import SearchResultUI from "../presentation/SearchResultUI";

interface ContainerProps {
  query: string;
}

export default function SearchResultContainer({ query }: ContainerProps) {
  // 검색 API 호출, 모달 스토어
  const { data, isLoading, isFetching } = useSearchBooks(query);
  const { isOpen: isModalOpen } = useModalStore();

  // 전역 서재 상태
  const { root, container1, container2 } = useLikedBookStore();
  const combined = [...root, ...container1, ...container2];

  const [openDropDownId, setOpenDropDownId] = useState<string | null>(null);

  // 북마크 클릭 이벤트
  const handleOpenDropDown = (isbn: string) => {
    // 중복 체크
    const isExist = combined.some((book) => book.isbn === isbn);
    if (isExist) {
      alert("이미 서재에 존재합니다!");

      setOpenDropDownId(null);
      return;
    }

    // 열러 있던 isbn와 같으면 닫기(toggle), 다르면 열기
    if (openDropDownId === isbn) {
      setOpenDropDownId(null);
    } else {
      setOpenDropDownId(isbn);
    }
  };

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

  return (
    <SearchResultUI
      books={data.documents}
      openDropDownId={openDropDownId}
      handleOpenDropDown={handleOpenDropDown}
      isModalOpen={isModalOpen}
    />
  );
}
