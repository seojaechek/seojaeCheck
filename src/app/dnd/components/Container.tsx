import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItm";

interface ContainerProps {
  id: string;
  items: string[];
}

export default function Container({ id, items }: ContainerProps) {
  const { setNodeRef } = useDroppable({
    //setNodeRef - 이벤트 적용 노드 참조
    id,
  });
  //useDroppable 아이템이 놓일 수 있는 공간을 ref로 참조

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
      // strategy 아이템들을 놓는 방법 ex) vertical, horizontal
    >
      <div ref={setNodeRef} className="m-2 h-[300px] flex-1 bg-gray-300 p-2">
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
}
