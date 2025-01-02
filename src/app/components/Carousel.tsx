"use client";
import Image from "next/image";

import { useModalStore } from "@/stores/modal";
import Modal from "./Modal";

import { Book } from "@/types/common";

export default function Carousel({ books }: { books: Book[] }) {
  const { isOpen, openModal, book } = useModalStore();

  return (
    <section className="group relative z-0 flex h-[213px] w-full items-center overflow-hidden border-2 border-neutral-200">
      <div className="carousel group-hover:pause animate-crausel1 absolute flex items-center">
        {books.map((book: Book) => {
          return (
            <div className="relative mr-7 h-[180px] w-[121px]" key={book.isbn}>
              <Image
                src={book.thumbnail}
                fill
                alt={book.title}
                onClick={() => {
                  openModal(book);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="carousel group-hover:pause animate-crausel2 absolute flex items-center">
        {books.map((book: Book) => {
          return (
            <div className="relative mr-7 h-[180px] w-[121px]" key={book.isbn}>
              <Image
                src={book.thumbnail}
                fill
                alt={book.title}
                onClick={() => {
                  openModal(book);
                }}
              />
            </div>
          );
        })}
      </div>
      {book && isOpen && <Modal detail={book} />}
    </section>
  );
}
