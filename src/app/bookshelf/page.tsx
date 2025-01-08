"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";

import Container from "./components/Container";
import SortableItem from "./components/SortableItm";
import { useLikedBookStore } from "@/stores/likedBooks";
import {
  handleDragStart,
  handleDragOver,
  handleDragEnd,
} from "@/libs/dnd/dragHelper";
import { likedBook } from "@/types/common";
import Modal from "../components/modal/Modal";
import { useModalStore } from "@/stores/modal";

export default function Dnd() {
  const { root, container1, container2, setItems } = useLikedBookStore();
  const { isOpen } = useModalStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  // items 객체로 묶어서 전달
  const items = { root, container1, container2 };

  // 모든 책을 한 배열에 모으기
  const allItems = [...root, ...container1, ...container2];

  // DnD 센서
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  // 컨테이너 업데이트 함수
  const updateContainers = (updated: Partial<typeof items>) => {
    Object.entries(updated).forEach(([container, arr]) => {
      // arr를 likedBook[]로 단언
      setItems(container as keyof typeof items, arr as likedBook[]);
    });
  };

  // 활성 아이템
  const activeItem = allItems.find((book) => book.isbn === activeId);

  return (
    <div className="min-h-minu-nav flex flex-col space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={(e) => handleDragStart(e, setActiveId)}
        onDragOver={(e) => handleDragOver(e, items, updateContainers)}
        onDragEnd={(e) =>
          handleDragEnd(e, items, updateContainers, setActiveId)
        }
      >
        {/* 컨테이너들 렌더링 */}
        {Object.entries(items).map(([id, bookList]) => (
          <Container key={id} id={id} items={bookList} />
        ))}

        {/* 드래그 중인 아이템을 떠 있는 형태로 */}
        <DragOverlay>
          {activeId && activeItem ? (
            <SortableItem id={activeItem.isbn} book={activeItem} />
          ) : null}
        </DragOverlay>

        {isOpen && <Modal />}
      </DndContext>
    </div>
  );
}
