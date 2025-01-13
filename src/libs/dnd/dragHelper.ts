import { likedBook } from "@/types/common";
import {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

// //**
// * 아이템이 속해있는 컨테이너를 찾는 함수
// */
export function findContainer(
  id: string, // isbn
  items: Record<string, likedBook[]>,
): string | undefined {
  if (id in items) {
    return id;
  }

  // 해당 id를 가진 likedBook이 어느 컨테이너에 속해 있는지 찾는다.
  return Object.keys(items).find((key) =>
    items[key].some((book) => book.isbn === id),
  );
}

/**
 * 드래그 시작 : active 상태 추적
 */
export function handleDragStart(
  event: DragStartEvent,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
) {
  const { active } = event;
  const id = active.id.toString();
  setActiveId(id);
}

/**
 * 드래그 중: 마우스가 다른 컨테이너 위로 이동할 때
 */
export function handleDragOver(
  event: DragOverEvent,
  items: Record<string, likedBook[]>,
  updateContainers: (updated: Partial<Record<string, likedBook[]>>) => void,
) {
  const { active, over } = event;
  const id = active.id.toString();
  const overId = over?.id.toString();

  const activeContainer = findContainer(id, items);
  const overContainer = overId ? findContainer(overId, items) : undefined;

  // 같은 컨테이너거나 유효하지 않으면 작업 중단
  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  // 현재 컨테이너 / 타겟 컨테이너 모두 복사
  const activeItems = [...items[activeContainer]];
  const overItems = [...items[overContainer]];

  // activeBook 인덱스 찾기
  const activeIndex = activeItems.findIndex((book) => book.isbn === id);
  if (activeIndex === -1) return;
  const [movedBook] = activeItems.splice(activeIndex, 1);

  // 드래그 중인 아이템의 새 인덱스
  let newIndex = 0;

  const overIndex = overItems.findIndex((book) => book.isbn === overId);

  // 만약 overId가 '컨테이너 자체'라면 -> 맨 뒤에 추가
  if (overId && overId === overContainer) {
    newIndex = overItems.length;
  } else {
    // 아이템 위에 드래그된 경우
    const isBelowLastItem =
      over && overIndex === overItems.length - 1 && event.delta.y > 0;
    const modifier = isBelowLastItem ? 1 : 0;
    newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
  }

  // 새 컨테이너에 아이템 삽입
  overItems.splice(newIndex, 0, movedBook);

  // 스토어 업데이트
  updateContainers({
    [activeContainer]: activeItems,
    [overContainer]: overItems,
  });
}

/**
 * 드랍 + 컨테이너 내에서 이동될 때
 */
/**
 * 드래그가 끝났을 때
 */
export function handleDragEnd(
  event: DragEndEvent,
  items: Record<string, likedBook[]>,
  updateContainers: (updated: Partial<Record<string, likedBook[]>>) => void,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
  setIsOutside: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { active, over } = event;

  // 컨테이너 밖에 드랍된 경우 -> 해당 아이템 삭제
  if (!over) {
    const id = active.id.toString();
    const activeContainer = findContainer(id, items);

    // 아이템이 속한 컨테이너를 찾고 삭제
    if (activeContainer) {
      const updatedItems = [...items[activeContainer]];
      const itemIndex = updatedItems.findIndex((book) => book.isbn === id);
      if (itemIndex !== -1) {
        updatedItems.splice(itemIndex, 1); // 아이템 삭제
        updateContainers({ [activeContainer]: updatedItems }); // 스토어 업데이트
      }
    }

    // 상태 초기화
    setIsOutside(false);
    setActiveId(null);
    return;
  }

  // 컨테이너 내부에서 드랍된 경우
  const id = active.id.toString();
  const overId = over.id.toString();
  const activeContainer = findContainer(id, items);
  if (!activeContainer) {
    setActiveId(null);
    return;
  }

  // 같은 컨테이너 내에서 위치만 변경한 경우
  if (activeContainer === findContainer(overId, items)) {
    const containerItems = [...items[activeContainer]];
    const activeIndex = containerItems.findIndex((book) => book.isbn === id);
    const overIndex = containerItems.findIndex((book) => book.isbn === overId);

    if (activeIndex !== overIndex && overIndex !== -1) {
      const newItems = arrayMove(containerItems, activeIndex, overIndex);
      updateContainers({
        [activeContainer]: newItems,
      });
    }
  }

  // 상태 초기화
  setActiveId(null);
  setIsOutside(false);
}

export function handleDragMove(
  event: DragMoveEvent,
  setIsOutside: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (!event.over) {
    setIsOutside(true);
  } else {
    setIsOutside(false);
  }
}
