import {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

/**
 * Finds the name of the container (object key) that an item belongs to.
 */
export function findContainer(
  id: UniqueIdentifier,
  items: Record<string, string[]>,
): string | undefined {
  const idStr = id.toString();

  // If the idStr matches a container key directly, return that
  if (idStr in items) {
    return idStr;
  }

  // Otherwise, find which container array includes the idStr
  return Object.keys(items).find((key) => items[key].includes(idStr));
}

/**
 * Handle drag start
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
 * Handle dragging over another container
 */
export function handleDragOver(
  event: DragOverEvent,
  items: Record<string, string[]>,
  // pass a callback that can update multiple containers in Zustand
  updateContainers: (updated: Partial<Record<string, string[]>>) => void,
) {
  const { active, over } = event;
  const id = active.id.toString();
  const overId = over?.id.toString();
  const activeContainer = findContainer(id, items);
  const overContainer = overId ? findContainer(overId, items) : undefined;

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  const activeItems = [...items[activeContainer]];
  const overItems = [...items[overContainer]];

  // Remove item from old container
  const activeIndex = activeItems.indexOf(id);
  activeItems.splice(activeIndex, 1);

  // Figure out insert index in new container
  let newIndex = 0;
  const overIndex = overItems.indexOf(overId as string);

  if (overId && overId in items) {
    // If dragging over the container itself, place at the end
    newIndex = overItems.length;
  } else {
    const isBelowLastItem =
      over && overIndex === overItems.length - 1 && event.delta.y > 0;
    const modifier = isBelowLastItem ? 1 : 0;
    newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
  }
  // Insert in the new container
  overItems.splice(newIndex, 0, id);

  updateContainers({
    [activeContainer]: activeItems,
    [overContainer]: overItems,
  });
}

/**
 * Handle dropping in the final container
 */
export function handleDragEnd(
  event: DragEndEvent,
  items: Record<string, string[]>,
  updateContainers: (updated: Partial<Record<string, string[]>>) => void,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
) {
  const { active, over } = event;
  if (!over) {
    // If dropped outside any container
    setActiveId(null);
    return;
  }

  const id = active.id.toString();
  const overId = over.id.toString();

  const activeContainer = findContainer(id, items);
  const overContainer = findContainer(overId, items);

  // If the item was dropped in another container, handleDragOver took care of it
  if (!activeContainer || !overContainer || activeContainer !== overContainer) {
    setActiveId(null);
    return;
  }

  // If we are reordering within the same container
  const containerItems = items[activeContainer];
  const activeIndex = containerItems.indexOf(id);
  const overIndex = containerItems.indexOf(overId);

  if (activeIndex !== overIndex) {
    const newItems = arrayMove(containerItems, activeIndex, overIndex);
    updateContainers({
      [activeContainer]: newItems,
    });
  }
  setActiveId(null);
}
