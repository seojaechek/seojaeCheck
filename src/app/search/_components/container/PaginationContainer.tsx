"use client";

import { Book } from "@/types/common";
import { useSearchStore } from "@/stores/searchStore";
import PaginationUI from "../presentation/PaginationUI";
import { useModalStore } from "@/stores/modal";

interface PaginationContainerProps {
  allDocs: Book[];
}

export default function PaginationContainer({
  allDocs,
}: PaginationContainerProps) {
  const { openModal } = useModalStore();
  const { currentPage, setCurrentPage, setOpenDropDownId } = useSearchStore();

  const totalDocs = allDocs.length;
  const totalPages = Math.ceil(totalDocs / 10);
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex = (safePage - 1) * 10;
  const endIndex = startIndex + 10;
  const pageDocs = allDocs.slice(startIndex, endIndex);

  const handleBookClick = (book: Book) => {
    openModal(book);
  };

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setOpenDropDownId(null);

    //스크롤 위로
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <PaginationUI
      books={pageDocs}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onBookClick={handleBookClick}
    />
  );
}
