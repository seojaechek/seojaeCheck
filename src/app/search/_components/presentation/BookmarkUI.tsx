"use client";

import Image from "next/image";
import { Book } from "@/types/common";
import DropDownContainer from "../container/DropDownContainer";
import bookmarkIcon from "/public/icons/Bookmark.svg";

interface BookmarkProps {
  book: Book;
  isOpen: boolean;
  onClickBookmark: (e: React.MouseEvent) => void;
}

export default function BookmarkUI({
  book,
  isOpen,
  onClickBookmark,
}: BookmarkProps) {
  return (
    <>
      <button
        type="button"
        className="group absolute right-5 top-4 cursor-pointer"
        onClick={onClickBookmark}
      >
        <Image
          src={bookmarkIcon}
          width={30}
          height={30}
          alt="북마크 추가"
          className="transition-transform duration-100 ease-in group-hover:scale-110"
        />
      </button>
      {isOpen && (
        <DropDownContainer
          title={book.title}
          isbn={book.isbn}
          thumbnail={book.thumbnail}
        />
      )}
    </>
  );
}
