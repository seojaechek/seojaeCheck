"use client";

import React, { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";

import Container from "./_components/Container";
import { useLikedBookStore } from "@/stores/likedBooks";
import {
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDragMove,
} from "@/utils/bookDragHelper";
import { likedBook } from "@/types/common";
import Modal from "../components/modal/Modal";
import { useModalStore } from "@/stores/modal";
import DraggedItem from "./_components/DraggedItem";

export default function Dnd() {
  const { toRead, reading, done, setItems } = useLikedBookStore();
  const { isOpen } = useModalStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOutside, setIsOutside] = useState<boolean>(false);

  // items 객체로 묶어서 전달
  const items = { toRead, reading, done };

  // 모든 책을 한 배열에 모으기
  const allItems = [...toRead, ...reading, ...done];

  // DnD 센서
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
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
    <article className="min-h-minu-nav flex flex-col space-y-5 px-[10%] pb-[12%] pt-[8%]">
      <h1 className="pb-2 text-3xl font-bold">내 서재</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={(e) => handleDragStart(e, setActiveId)}
        onDragOver={(e) => handleDragOver(e, items, updateContainers)}
        onDragEnd={(e) =>
          handleDragEnd(e, items, updateContainers, setActiveId, setIsOutside)
        }
        onDragMove={(e) => {
          handleDragMove(e, setIsOutside);
        }}
      >
        {/* 컨테이너들 렌더링 */}
        {Object.entries(items).map(([id, bookList]) => (
          <Container key={id} id={id} items={bookList} />
        ))}

        {activeId && activeItem && (
          <DraggedItem isOutside={isOutside} activeItem={activeItem} />
        )}
      </DndContext>
      {isOpen && <Modal />}
    </article>
  );
}
