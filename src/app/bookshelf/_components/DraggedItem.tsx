import { DragOverlay } from "@dnd-kit/core";
import Image from "next/image";
import React from "react";
import SortableItem from "./SortableItm";
import Delete from "/public/icons/Delete.png";
import { likedBook } from "@/types/common";

export default function DraggedItem({
  isOutside,
  activeItem,
}: {
  isOutside: boolean;
  activeItem: likedBook;
}) {
  return (
    <DragOverlay>
      {isOutside && (
        <div className="flexCenter absolute z-10 h-[180px] w-[121px] bg-red-200 opacity-50">
          <Image src={Delete} sizes="8" alt="삭제하기" />
        </div>
      )}
      <SortableItem id={activeItem.isbn} book={activeItem} />
    </DragOverlay>
  );
}
