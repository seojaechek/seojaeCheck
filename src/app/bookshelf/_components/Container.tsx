"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItm";
import { likedBook } from "@/types/common";
import { bookShelfLabel } from "@/utils/bookShelfLabel";

interface ContainerProps {
  id: string;
  items: likedBook[];
}

export default function Container({ id, items }: ContainerProps) {
  // useDroppable : 아이템이 놓일 수 있는 공간
  const { setNodeRef } = useDroppable({
    id,
  });

  const labelName = bookShelfLabel(id);

  return (
    <SortableContext
      id={id}
      // dnd-kit은 key 배열이 필요 -> 여기서는 book.isbn
      items={items.map((item) => item.isbn)}
      strategy={horizontalListSortingStrategy}
    >
      <label className="text-xl font-semibold">{labelName}</label>
      <section
        ref={setNodeRef}
        className="no-scrollbar flex h-[180px] flex-row space-x-3 overflow-x-scroll bg-white"
      >
        {items.map((item) => (
          <SortableItem key={item.isbn} id={item.isbn} book={item} />
        ))}
      </section>
    </SortableContext>
  );
}
