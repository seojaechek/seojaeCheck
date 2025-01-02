"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { likedBook } from "@/types/common";
import Image from "next/image";

interface SortableItemProps {
  id: string;
  book: likedBook;
}

function SortableItem({ id, book }: SortableItemProps) {
  const { listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...listeners}
    >
      <div className="relative h-[180px] w-[121px]" key={book.isbn}>
        {book.thumbnail ? (
          <Image src={book.thumbnail} fill alt={book.title} />
        ) : (
          <div className="flexCenter h-[180px] w-[121px] border border-black">
            No Image
          </div>
        )}
      </div>
    </div>
  );
}

export default SortableItem;
