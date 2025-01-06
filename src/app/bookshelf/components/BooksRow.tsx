import Image from "next/image";
import { Book } from "@/types/common";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

export default function BooksRow({ data }: { data: Book[] }) {
  const { containerRef, handleWheel } = useHorizontalScroll();
  return (
    <div
      className="no-scrollbar mx-10 w-full overflow-x-auto scroll-smooth rounded-lg border-4"
      onWheel={handleWheel}
      ref={containerRef}
    >
      <div className="flex w-max p-6">
        {data?.map((item: Book) => (
          <div key={item.isbn} className="relative mx-2 h-48 w-32">
            <Image
              src={item.thumbnail}
              alt={item.title || "Thumbnail"}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
        <div className="mx-2 flex h-48 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-[#d4d4d4]"></div>
      </div>
    </div>
  );
}
