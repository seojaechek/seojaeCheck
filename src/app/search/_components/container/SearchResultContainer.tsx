"use client";

import { useState } from "react";
import { useModalStore } from "@/stores/modal";
import { useSearchStore } from "@/stores/searchStore";
import { useLikedBookStore } from "@/stores/likedBooks";
import SearchResult from "../presentation/SearchResult";
import { Book, BookResponse, likedBook } from "@/types/common";

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
  const { isOpen: isModalOpen, openModalWithData } = useModalStore();
  const { toRead, reading, done, setItems } = useLikedBookStore();
  const { openDropDownId, setOpenDropDownId } = useSearchStore();
  const [selectedBookshelf, setSelectedBookshelf] = useState<
    "" | "toRead" | "reading" | "done"
  >("");

  const combined = [...toRead, ...reading, ...done];
  const BookshelfMap = {
    toRead: "읽고 싶은 책",
    reading: "읽고 있는 책",
    done: "다 읽은 책",
  };

  function checkDuplicate(isbn: string): boolean {
    return combined.some((b) => b.isbn === isbn);
  }

  const handleDropDownToggle = (isbn: string) => {
    if (openDropDownId === isbn) {
      setOpenDropDownId(null);
    } else {
      setOpenDropDownId(isbn);
    }
  };

  // 북마크 클릭 이벤트
  const handleClickBookmark = (e: React.MouseEvent, isbn: string) => {
    // 부모 article 클릭 이벤트 차단
    e.stopPropagation();

    // 중복 체크
    if (checkDuplicate(isbn)) {
      alert("이미 서재에 존재합니다!");
      setOpenDropDownId(null);
      return;
    }

    handleDropDownToggle(isbn);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBookshelf(e.target.value as "toRead" | "reading" | "done");
  };

  const handleConfirm = (title: string, isbn: string, thumbnail: string) => {
    const newBook: likedBook = { title, isbn, thumbnail };
    if (!selectedBookshelf) {
      alert("책장을 선택해주세요!");
      return;
    }

    const bookshelfArr = useLikedBookStore.getState()[selectedBookshelf];
    const updated = [...bookshelfArr, newBook];
    setItems(selectedBookshelf, updated);

    alert(
      `[${title}] 책이 ${BookshelfMap[selectedBookshelf]}에 추가되었습니다.`,
    );

    setOpenDropDownId(null);
    setSelectedBookshelf("");
  };

  const handleBookClick = (book: Book) => {
    openModalWithData(book);
  };

  // 검색어가 없을 때
  if (!query) {
    return <p className="mt-4 text-4xl font-black">검색어가 없습니다.</p>;
  }

  // query에 맞는 결과가 없을 때
  if (documents.length === 0) {
    return <p className="mt-4 text-4xl font-black">검색 결과가 없습니다.</p>;
  }

  return (
    <SearchResult
      meta={meta}
      allDocs={documents}
      currentPageNum={page}
      isModalOpen={isModalOpen}
      clickBook={handleBookClick}
      goToBookShelf={handleConfirm}
      openDropDownId={openDropDownId}
      selectChange={handleSelectChange}
      selectBookshelf={selectedBookshelf}
      setOpenDropDownId={setOpenDropDownId}
      clickBookmark={handleClickBookmark}
    />
  );
}
