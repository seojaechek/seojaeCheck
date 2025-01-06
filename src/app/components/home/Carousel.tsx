"use client";
import Image from "next/image";

import { useModalStore } from "@/stores/modal";
import Modal from "../Modal";

import { Book } from "@/types/common";

export default function Carousel({ books }: { books: Book[] }) {
  const { isOpen, openModal, book } = useModalStore();

  return (
    <section className="group relative z-0 flex h-[213px] w-full items-center overflow-hidden border-2 border-neutral-200">
      <div className="carousel group-hover:pause absolute flex animate-firstSlide items-center">
        {books.map((book: Book) => {
          return (
            <div className="relative mr-7 h-[180px] w-[121px]" key={book.isbn}>
              <Image
                src={book.thumbnail}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                alt={book.title}
                onClick={() => {
                  openModal(book);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="carousel group-hover:pause absolute flex animate-secondSlide items-center">
        {books.map((book: Book) => {
          return (
            <div className="relative mr-7 h-[180px] w-[121px]" key={book.isbn}>
              <Image
                src={book.thumbnail}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
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
