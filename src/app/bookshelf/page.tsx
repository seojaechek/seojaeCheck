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

import Container from "./_components/Container";
import SortableItem from "./_components/SortableItm";
import { useLikedBookStore } from "@/stores/likedBooks";
import {
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDragMove,
} from "@/libs/dnd/dragHelper";
import { likedBook } from "@/types/common";
import Modal from "../components/modal/Modal";
import { useModalStore } from "@/stores/modal";
import Delete from "/public/icons/Delete.png";
import Image from "next/image";

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
    <article className="min-h-minu-nav flex flex-col space-y-5 p-[5%]">
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

        {/* 드래그 중인 아이템 */}
        <DragOverlay>
          {activeId && activeItem ? (
            <div>
              {isOutside && (
                <div className="flexCenter absolute z-10 h-[180px] w-[121px] bg-red-200 opacity-50">
                  <Image src={Delete} sizes="8" alt="삭제하기" />
                </div>
              )}

              <SortableItem id={activeItem.isbn} book={activeItem} />
            </div>
          ) : null}
        </DragOverlay>

        {isOpen && <Modal />}
      </DndContext>
    </article>
  );
}
