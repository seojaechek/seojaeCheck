"use client";
import Image from "next/image";

import { bookInfo } from "@/types/common";

export default function Carusel({ books }: { books: bookInfo[] }) {
  return (
    <section className="group relative flex h-[213px] w-full items-center overflow-hidden border-2 border-neutral-200">
      <div className="group-hover:pause absolute flex animate-crausel1 items-center">
        {books.map((book: bookInfo) => {
          return (
            <div className="relative mr-7 h-[180px] w-[121px]" key={book.isbn}>
              <Image src={book.thumbnail} fill alt={book.title} />
            </div>
          );
        })}
      </div>
      <div className="group-hover:pause absolute flex animate-crausel2 items-center">
        {books.map((book: bookInfo) => {
          return (
            <div className="relative mr-7 h-[180px] w-[121px]" key={book.isbn}>
              <Image src={book.thumbnail} fill alt={book.title} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
