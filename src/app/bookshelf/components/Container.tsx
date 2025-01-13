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

  function titleConverter(id: string) {
    if (id === "toRead") {
      return "읽을 책";
    } else if (id === "reading") {
      return "읽고 있는 책";
    }
    return "다 읽은 책";
  }

  return (
    <SortableContext
      id={id}
      // dnd-kit은 key 배열이 필요 -> 여기서는 book.isbn
      items={items.map((item) => item.isbn)}
      strategy={horizontalListSortingStrategy}
    >
      <label className="font-styled text-2xl font-extrabold text-font-textPrimary">
        {titleConverter(id)}
      </label>
      <section
        ref={setNodeRef}
        className="flex min-h-[180px] flex-1 flex-row space-x-3 overflow-x-scroll border border-brown-2 bg-white"
      >
        {items.map((item) => (
          <SortableItem key={item.isbn} id={item.isbn} book={item} />
        ))}
      </section>
    </SortableContext>
  );
}
