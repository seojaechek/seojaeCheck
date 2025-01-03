"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItm";
import { likedBook } from "@/types/common";

interface ContainerProps {
  id: string;
  items: likedBook[];
}

export default function Container({ id, items }: ContainerProps) {
  // useDroppable : 아이템이 놓일 수 있는 공간
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      // dnd-kit은 key 배열이 필요 -> 여기서는 book.isbn
      items={items.map((item) => item.isbn)}
      strategy={horizontalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="m-2 flex min-h-[180px] flex-1 flex-row space-x-2 overflow-x-scroll bg-gray-300 p-2"
      >
        {items.map((item) => (
          <SortableItem key={item.isbn} id={item.isbn} book={item} />
        ))}
      </div>
    </SortableContext>
  );
}
