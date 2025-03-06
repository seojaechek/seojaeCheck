"use client";

import { useState } from "react";
import { useLikedBookStore } from "@/stores/likedBooks";
import { likedBook } from "@/types/common";
import { useSearchStore } from "@/stores/searchStore";

interface DropdownProps {
  title: string;
  isbn: string;
  thumbnail: string;
  dropdownPosition: string;
}

export default function Dropdown({
  title,
  isbn,
  thumbnail,
  dropdownPosition,
}: DropdownProps) {
  const [selectedBookshelf, setSelectedBookshelf] = useState<
    "" | "toRead" | "reading" | "done"
  >();

  const { setOpenDropdownId } = useSearchStore();
  const { toRead, reading, done, setItems } = useLikedBookStore();
  const shelves = { toRead, reading, done };

  const Bookshelves = {
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

    const newBook: likedBook = { title, isbn, thumbnail };
    const shelfArray = shelves[selectedBookshelf];
    const updated = [...shelfArray, newBook];

    setItems(selectedBookshelf, updated);

    alert(
      `[${title}] 책이 [${Bookshelves[selectedBookshelf]}]에 추가되었습니다.`,
    );
    setOpenDropdownId(null);
    setSelectedBookshelf("");
  };

  return (
    <form
      action=""
      className={`${dropdownPosition} absolute top-11 flex w-1/2 flex-col items-center gap-3 rounded border bg-white p-5 shadow-lg md:w-1/3`}
      onClick={(e) => e.stopPropagation()}
    >
      <label className="mr-2 text-sm font-semibold">
        어느 서재에 담을까요?
      </label>
      <select
        name="bookshelves"
        id="bookshelf-select"
        value={selectedBookshelf}
        onChange={(e) => handleSelectChange(e)}
        className="w-full border px-2 py-1 text-sm"
      >
        <option value="">-- 서재 선택 --</option>
        <option value="toRead">읽고 싶은 책</option>
        <option value="reading">읽고 있는 책</option>
        <option value="done">다 읽은 책</option>
      </select>
      <div className="flex w-full items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full rounded bg-font-textPrimary px-2 py-1 text-sm text-brown-1"
        >
          추가
        </button>
        <button
          type="button"
          className="w-full rounded bg-gray-300 px-2 py-1 text-sm text-black"
          onClick={() => setOpenDropdownId(null)}
        >
          취소
        </button>
      </div>
    </form>
  );
}
