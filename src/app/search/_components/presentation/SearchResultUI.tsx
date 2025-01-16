"use client";

import { Book } from "@/types/common";
import Modal from "@/app/components/modal/Modal";
import PaginationContainer from "../container/PaginationContainer";

interface SearchResultProps {
  allDocs: Book[];
  isModalOpen: boolean;
}

export default function SearchResultUI({
  allDocs,
  isModalOpen,
}: SearchResultProps) {
  return (
    <section>
      <PaginationContainer allDocs={allDocs} />
      {isModalOpen && <Modal />}
    </section>
  );
}
