"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { likedBook } from "@/types/common";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import { useModalStore } from "@/stores/modal";

interface SortableItemProps {
  id: string;
  book: likedBook;
}

function SortableItem({ id, book }: SortableItemProps) {
  const { listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });
  const { openModal, isOpen, data } = useModalStore();
  console.log(isOpen);
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...listeners}
    >
      <div
        className="relative h-[180px] w-[121px]"
        key={book.isbn}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          openModal(book.isbn);
          e.stopPropagation();
        }}
      >
        {book.thumbnail ? (
          <Image
            src={book.thumbnail}
            fill
            alt={book.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        ) : (
          <div className="flexCenter h-[180px] w-[121px] border border-black">
            No Image
          </div>
        )}
        {isOpen && data && <Modal />}
      </div>
    </div>
  );
}

export default SortableItem;
