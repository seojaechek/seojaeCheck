"use client";

import Image from "next/image";
import { Book } from "@/types/common";
import { useSearchStore } from "@/stores/searchStore";
import BookmarkContainer from "../container/BookmarkContainer";

interface PaginationProps {
  books: Book[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onBookClick: (book: Book) => void;
}

export default function PaginationUI({
  books,
  currentPage,
  totalPages,
  onPageChange,
  onBookClick,
}: PaginationProps) {
  const { openDropDownId } = useSearchStore();

  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <ul className="flex flex-col items-center gap-5">
        {books.map((book) => (
          <li key={book.isbn} className="searchList">
            <article
              className="relative flex cursor-pointer justify-center"
              onClick={() => onBookClick(book)}
            >
              <picture className="flexCenter relative mx-8 my-3 h-60 w-40 shadow-md">
                <Image
                  src={book.thumbnail}
                  fill
                  alt={`${book.title} 표지`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                />
              </picture>

              <BookmarkContainer
                book={book}
                isOpen={openDropDownId === book.isbn}
              />

              <div className="border border-borderColor" />
              <div className="my-4 ml-8 mr-12 flex w-8/12 flex-col justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="font-styled text-2xl font-extrabold text-font-textPrimary">
                    {book.title}
                  </h2>
                  <p className="line-clamp-3 text-sm font-medium text-font-textSecondary">
                    {book.contents}
                  </p>
                </div>

                <dl className="grid gap-2 text-sm leading-5 text-font-textPrimary">
                  <div className="flex">
                    <dt className="searchDetail">작가</dt>
                    <dd className="font-semibold">{book.authors}</dd>
                  </div>
                  {book.translators && book.translators.length > 0 ? (
                    <div className="flex">
                      <dt className="searchDetail">번역</dt>
                      <dd className="font-semibold">{book.translators}</dd>
                    </div>
                  ) : null}

                  <div className="flex">
                    <dt className="searchDetail">출판사</dt>
                    <dd className="font-semibold">{book.publisher}</dd>
                  </div>
                  <div className="flex">
                    <dt className="searchDetail">출판 날짜</dt>
                    <dd className="font-semibold">
                      {book.datetime ? book.datetime.split("T")[0] : "x"}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <nav className="flexCenter mt-4 gap-2">
          {pagesArr.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`rounded border px-3 py-1 ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
