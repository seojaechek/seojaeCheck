"use client";
import Image from "next/image";

import { useModalStore } from "@/stores/modal";
import Modal from "../modal/Modal";

import { Book } from "@/types/common";

export default function Carousel({
  books,
  isModal,
}: {
  books: Book[];
  isModal: boolean;
}) {
  const { isOpen, openModalWithData } = useModalStore();

  return (
    <section className="group relative z-0 flex h-[213px] w-full items-center overflow-hidden border-2 border-neutral-200">
      <div
        className={`carousel ${isOpen && "pause"} group-hover:pause absolute flex animate-firstSlide items-center`}
      >
        {books.map((book: Book) => {
          return (
            <div className="relative mr-7 h-[180px] w-[121px]" key={book.isbn}>
              <Image
                src={book.thumbnail}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                alt={book.title}
                onClick={() => {
                  openModalWithData(book);
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        className={`carousel ${isOpen && "pause"} group-hover:pause absolute flex animate-secondSlide items-center`}
      >
        {books.map((book: Book) => {
          return (
            <div className="relative mr-7 h-[180px] w-[121px]" key={book.isbn}>
              <Image
                src={book.thumbnail}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                alt={book.title}
                onClick={() => {
                  openModalWithData(book);
                }}
              />
            </div>
          );
        })}
      </div>
      {isOpen && isModal && <Modal />}
    </section>
  );
}
