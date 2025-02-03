"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { likedBook } from "@/types/common";
import noImage from "/public/NoBookImage.jpeg";
import Image from "next/image";

import { useModalStore } from "@/stores/modal";

interface SortableItemProps {
  id: string;
  book: likedBook;
  isOutside?: boolean;
}

function SortableItem({ id, book }: SortableItemProps) {
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id,
    });
  const { openModalWithIsbn } = useModalStore();

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...listeners}
    >
      <figure
        className={`relative h-[180px] w-[121px] ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
        key={book.isbn}
        onClick={() => openModalWithIsbn(book.isbn)}
      >
        <Image
          src={book.thumbnail || noImage}
          fill
          alt={book.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          className="object-cover"
        />
        {/* 제목 오버레이 */}
        {!book.thumbnail && (
          <figcaption className="absolute inset-0 flex items-center justify-center bg-black/70 p-2 text-center text-sm font-semibold text-white opacity-0 transition-opacity duration-200 hover:opacity-100">
            {book.title}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

export default SortableItem;
