import { useRef } from "react";

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += event.deltaY;
    }
  };

  return { containerRef, handleWheel };
}
