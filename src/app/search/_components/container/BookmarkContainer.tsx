"use client";

import { Book } from "@/types/common";
import BookmarkUI from "../presentation/BookmarkUI";
import { useSearchStore } from "@/stores/searchStore";
import { useLikedBookStore } from "@/stores/likedBooks";

interface ContainerProps {
  book: Book;
  isOpen: boolean;
}

export default function BookmarkContainer({ book, isOpen }: ContainerProps) {
  const { openDropDownId, setOpenDropDownId } = useSearchStore();

  // 전역 서재 상태
  const { root, container1, container2 } = useLikedBookStore();
  const combined = [...root, ...container1, ...container2];

  function checkDuplicate(isbn: string): boolean {
    return combined.some((b) => b.isbn === isbn);
  }

  const handleDropDownToggle = () => {
    if (openDropDownId === book.isbn) {
      setOpenDropDownId(null);
    } else {
      setOpenDropDownId(book.isbn);
    }
  };

  // 북마크 클릭 이벤트
  const handleClickBookmark = (e: React.MouseEvent) => {
    // 부모 article 클릭 이벤트 차단
    e.stopPropagation();

    // 중복 체크
    if (checkDuplicate(book.isbn)) {
      alert("이미 서재에 존재합니다!");
      setOpenDropDownId(null);
      return;
    }

    handleDropDownToggle();
  };

  return (
    <BookmarkUI
      book={book}
      isOpen={isOpen}
      onClickBookmark={handleClickBookmark}
    />
  );
}
