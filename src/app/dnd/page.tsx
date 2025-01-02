"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

// Components
import Container from "./components/Container";
import SortableItem from "./components/SortableItm";

// Zustand store
import { useLikedBookStore } from "@/stores/likedBooks";

// Drag helper imports
import {
  handleDragStart,
  handleDragOver,
  handleDragEnd,
} from "@/libs/dnd/dragHelper";
import Spinner from "./components/Spinner";

export default function Dnd() {
  // Zustand store state
  const { root, container1, container2, setItems, setMultipleContainers } =
    useLikedBookStore();
  // Local state for active drag item
  const [activeId, setActiveId] = useState<string | null>(null);

  // Combined container items
  const items = { root, container1, container2 };

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // Update containers utility
  const updateContainers = (updated: Partial<typeof items>) => {
    if (setMultipleContainers) {
      setMultipleContainers(updated);
    } else {
      Object.entries(updated).forEach(([container, arr]) => {
        setItems(container as keyof typeof items, arr as string[]);
      });
    }
  };

  return (
    <div className="h-minu-nav flex flex-row">
      {root.length ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(event) => handleDragStart(event, setActiveId)}
          onDragOver={(event) => handleDragOver(event, items, updateContainers)}
          onDragEnd={(event) =>
            handleDragEnd(event, items, updateContainers, setActiveId)
          }
        >
          {/* Render containers */}
          <Container id="root" items={items.root} />
          <Container id="container1" items={items.container1} />
          <Container id="container2" items={items.container2} />

          {/* Drag overlay */}
          <DragOverlay>
            {activeId ? <SortableItem id={activeId} /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size="md" />
        </div>
      )}
    </div>
  );
}
