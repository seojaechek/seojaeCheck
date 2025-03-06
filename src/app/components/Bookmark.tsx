"use client";

import Dropdown from "./Dropdown";

import { Book } from "@/types/common";
import IconButton from "@/app/components/IconButton";
import bookmarkIcon from "/public/icons/Bookmark.svg";
import { useLikedBookStore } from "@/stores/likedBooks";
import { useSearchStore } from "@/stores/searchStore";

interface BookmarkProps {
  book: Book;
  btnPosition: string;
  dropdownPosition: string;
}

export default function Bookmark({
  book,
  btnPosition,
  dropdownPosition,
}: BookmarkProps) {
  const { openDropdownId, setOpenDropdownId } = useSearchStore();
  const { toRead, reading, done } = useLikedBookStore();
  const isOpenDropdown = openDropdownId === book?.isbn;

  const combined = [...toRead, ...reading, ...done];

  function checkDuplicate(isbn: string): boolean {
    return combined.some((b) => b.isbn === isbn);
  }

  const handleDropdownToggle = (isbn: string) => {
    if (openDropdownId === isbn) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(isbn);
    }
  };

  const handleClickBookmark = (e: React.MouseEvent, isbn: string) => {
    // 부모 article 클릭 이벤트 차단
    e.stopPropagation();

    // 중복 체크
    if (checkDuplicate(isbn)) {
      alert("이미 서재에 존재합니다!");
      setOpenDropdownId(null);
      return;
    }

    handleDropdownToggle(isbn);
  };
  return (
    <>
      <IconButton
        buttonClassName={`${btnPosition} group absolute top-4 z-10 cursor-pointer`}
        onClick={(e) => handleClickBookmark(e, book.isbn)}
        src={bookmarkIcon}
        width={25}
        height={25}
        alt="북마크 추가"
        imgClassName='transition-transform duration-100 ease-in group-hover:scale-110"'
      />
      {isOpenDropdown && (
        <Dropdown
          title={book.title}
          isbn={book.isbn}
          thumbnail={book.thumbnail}
          dropdownPosition={dropdownPosition}
        />
      )}
    </>
  );
}
