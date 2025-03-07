import React from "react";
import Image from "next/image";
import noImage from "/public/NoBookImage.jpeg";
import Bookmark from "@/app/components/Bookmark";
import { Book } from "@/types/common";

interface BookItemProps {
  book: Book;
}

function extractISBN(isbn: string) {
  const [isbn10, isbn13] = isbn.split(" ");
  return { isbn10, isbn13 };
}

function formatDate(dateTime?: string) {
  if (!dateTime) return "표시할 날짜가 없습니다.";
  return dateTime.split("T")[0];
}

function BookItem({ book }: BookItemProps) {
  const { isbn10, isbn13 } = extractISBN(book.isbn);
  const publishedDate = formatDate(book.datetime);

  const hasTranslators = book.translators && book.translators.length > 0;

  const detailList = [
    { label: "작가", value: book.authors },
    hasTranslators ? { label: "번역", value: book.translators } : null,
    { label: "출판사", value: book.publisher },
    { label: "출판 날짜", value: publishedDate },
    { label: "ISBN-10", value: isbn10 },
    { label: "ISBN-13", value: isbn13 },
  ].filter(Boolean);

  return (
    <li className="searchList">
      <article className="relative flex justify-center">
        <picture className="flexCenter relative mx-4 my-3 h-40 w-28 self-center shadow-md md:mx-8 md:h-60 md:w-36">
          <Image
            src={book.thumbnail || noImage}
            fill
            priority={true}
            alt={`${book.title} 표지`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        </picture>

        <div className="md:border md:border-borderColor" />

        <div className="my-2 ml-4 mr-12 flex w-8/12 flex-col justify-between gap-2 md:my-4 md:ml-8 md:mr-14">
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-black text-font-textPrimary md:text-2xl">
              {book.title}
            </h2>

            <p className="line-clamp-2 text-xs font-medium text-font-textSecondary md:line-clamp-4 md:text-sm">
              {book.contents}
            </p>
          </div>

          <dl className="grid gap-1 text-xs leading-5 text-font-textPrimary md:gap-2 md:text-sm">
            {detailList.map((detail) => (
              <div className="searchBookKey" key={detail?.label}>
                <dt className="searchDetail">{detail?.label}</dt>
                <dd className="font-semibold">{detail?.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Bookmark
          book={book}
          btnPosition={"right-5"}
          dropdownPosition={"right-5 w-1/4"}
        />
      </article>
    </li>
  );
}

export default React.memo(BookItem);
