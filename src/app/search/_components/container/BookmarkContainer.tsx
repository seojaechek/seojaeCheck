"use client";

import { Book } from "@/types/common";
import BookmarkUI from "../presentation/BookmarkUI";

interface ContainerProps {
  book: Book;
  isOpen: boolean;
  onOpenDropDown: (isbn: string) => void;
}

export default function BookmarkContainer({
  book,
  isOpen,
  onOpenDropDown,
}: ContainerProps) {
  // 북마크 클릭 이벤트
  const handleClickBookmark = (e: React.MouseEvent) => {
    // 부모 article 클릭 이벤트 차단
    e.stopPropagation();

    onOpenDropDown(book.isbn);
  };

  return (
    <BookmarkUI
      book={book}
      isOpen={isOpen}
      onClickBookmark={handleClickBookmark}
    />
  );
}
