"use client";

import { useState } from "react";
import { likedBook } from "@/types/common";
import { useLikedBookStore } from "@/stores/likedBooks";
import DropDownUI from "../presentation/DropDownUI";
import { useSearchStore } from "@/stores/searchStore";

interface containerProps {
  title: string;
  isbn: string;
  thumbnail: string;
}

export default function DropDownContainer({
  title,
  isbn,
  thumbnail,
}: containerProps) {
  // 책장 저장용
  const newBook: likedBook = { title, isbn, thumbnail };
  const [selectedBookshelf, setSelectedBookshelf] = useState<
    "" | "root" | "container1" | "container2"
  >("");

  const { setItems } = useLikedBookStore();
  const { setOpenDropDownId } = useSearchStore();

  const BookshelfMap = {
    root: "읽고 싶은 책",
    container1: "읽고 있는 책",
    container2: "다 읽은 책",
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBookshelf(
      e.target.value as "root" | "container1" | "container2",
    );
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

    setOpenDropDownId(null);
    setSelectedBookshelf("");
  };

  return (
    <DropDownUI
      handleConfirm={handleConfirm}
      selectedBookshelf={selectedBookshelf}
      handleSelectChange={handleSelectChange}
      setOpenDropDownId={setOpenDropDownId}
    />
  );
}
