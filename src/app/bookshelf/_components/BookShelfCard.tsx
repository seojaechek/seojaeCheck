import Image from "next/image";
import React from "react";
import noImage from "/public/NoBookImage.jpeg";
import { likedBook } from "@/types/common";

interface BookShelfCardProps {
  isDragging: boolean;
  book: likedBook;
  onCardClick: () => void;
}

export default function BookShelfCard({
  isDragging,
  book,
  onCardClick,
}: BookShelfCardProps) {
  return (
    <figure
      className={`relative h-[180px] w-[120px] ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      key={book.isbn}
      onClick={() => onCardClick()}
    >
      <Image
        src={book.thumbnail || noImage}
        fill
        alt={book.title}
        sizes="120"
        className="object-cover"
      />
      {/* 책에 제목이 없을 시 Hover 떄 나타남 */}
      {!book.thumbnail && (
        <figcaption className="absolute inset-0 flex items-center justify-center bg-black/70 p-2 text-center text-sm font-semibold text-white opacity-0 transition-opacity duration-200 hover:opacity-100">
          {book.title}
        </figcaption>
      )}
    </figure>
  );
}
