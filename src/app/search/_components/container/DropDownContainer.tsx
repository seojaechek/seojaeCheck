"use client";

import { useState } from "react";
import { likedBook } from "@/types/common";
import { useLikedBookStore } from "@/stores/likedBooks";
import DropDownUI from "../presentation/DropDownUI";

interface containerProps {
  title: string;
  isbn: string;
  thumbnail: string;
  handleCloseDropDown: (isbn: string) => void;
}

export default function DropDownContainer({
  title,
  isbn,
  thumbnail,
  handleCloseDropDown,
}: containerProps) {
  // 책장 저장용
  const newBook: likedBook = { title, isbn, thumbnail };

  const [selectedBookshelf, setSelectedBookshelf] = useState<
    "" | "toRead" | "reading" | "done"
  >("");

  const { setItems } = useLikedBookStore();

  const BookshelfMap: Record<"toRead" | "reading" | "done", string> = {
    toRead: "읽고 싶은 책",
    reading: "읽고 있는 책",
    done: "다 읽은 책",
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBookshelf(e.target.value as "toRead" | "reading" | "done");
  };

  const handleConfirm = () => {
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

    handleCloseDropDown(isbn);
    setSelectedBookshelf("");
  };

  const handleCancel = () => {
    handleCloseDropDown(isbn);
  };

  return (
    <DropDownUI
      selectedBookshelf={selectedBookshelf}
      handleSelectChange={handleSelectChange}
      handleConfirm={handleConfirm}
      handleCancel={handleCancel}
    />
  );
}
