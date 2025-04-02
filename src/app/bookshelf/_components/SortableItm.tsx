"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { likedBook } from "@/types/common";
import { useModalStore } from "@/stores/modal";
import BookShelfCard from "./BookShelfCard";

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
      <BookShelfCard
        book={book}
        isDragging={isDragging}
        onCardClick={() => openModalWithIsbn(book.isbn)}
      />
    </div>
  );
}

export default SortableItem;
