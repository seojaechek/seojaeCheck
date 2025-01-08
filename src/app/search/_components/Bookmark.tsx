"use client";

import Image from "next/image";
import { useState } from "react";
import DropDown from "./DropDown";
import { likedBook } from "@/types/common";
import { useLikedBookStore } from "@/stores/likedBooks";
import bookmarkFilled from "/public/icons/BookmarkFilled.svg";

export default function Bookmark({ title, thumbnail, isbn }: likedBook) {
  const { root, container1, container2 } = useLikedBookStore();

  const [showSelect, setShowSelect] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 전체 서재 store
    const combined = [...root, ...container1, ...container2];

    // 중복 검사
    const isExist = combined.some((book) => book.isbn === isbn);
    if (isExist) {
      alert("이미 서재에 존재합니다!");
      return;
    }

    // 중복이 아니면 드롭다운 open
    setShowSelect(true);
  };

  return (
    <>
      <button
        type="button"
        className="absolute right-5 top-4 cursor-pointer"
        onClick={handleBookmarkClick}
      >
        <Image src={bookmarkFilled} width={28} height={28} alt="북마크 추가" />
      </button>
      {showSelect && (
        <DropDown
          title={title}
          isbn={isbn}
          thumbnail={thumbnail}
          setShowSelect={setShowSelect}
        />
      )}
    </>
  );
}
