import Image from "next/image";
import Bookmark from "./Bookmark";
import DropDown from "./DropDown";
import Pagination from "../Pagination";
import Modal from "@/app/components/modal/Modal";
import { Book, BookResponse } from "@/types/common";

interface SearchResultProps {
  meta: BookResponse["meta"];
  allDocs: Book[];
  isModalOpen: boolean;
  currentPageNum: number;
  selectBookshelf: string;
  openDropDownId: string | null;

  clickBook: (book: Book) => void;
  setOpenDropDownId: (id: string | null) => void;
  clickBookmark: (e: React.MouseEvent, isbn: string) => void;
  selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  goToBookShelf: (title: string, isbn: string, thumbnail: string) => void;
}

export default function SearchResult({
  meta,
  allDocs,
  isModalOpen,
  currentPageNum,
  selectChange,
  openDropDownId,
  goToBookShelf,
  clickBookmark,
  clickBook,
  setOpenDropDownId,
  selectBookshelf,
}: SearchResultProps) {
  return (
    <section>
      <ul className="flex flex-col items-center gap-5">
        {allDocs.map((book) => {
          const isOpen = openDropDownId === book.isbn;
          return (
            <li key={book.isbn} className="searchList">
              <article
                className="relative flex cursor-pointer justify-center"
                onClick={() => clickBook(book)}
              >
                <picture className="flexCenter relative mx-8 my-3 h-60 w-40 shadow-md">
                  <Image
                    src={book.thumbnail}
                    fill
                    alt={`${book.title} 표지`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  />
                </picture>

                <Bookmark book={book} onClickBookmark={clickBookmark} />
                {isOpen && (
                  <DropDown
                    title={book.title}
                    isbn={book.isbn}
                    thumbnail={book.thumbnail}
                    handleConfirm={goToBookShelf}
                    handleSelectChange={selectChange}
                    selectedBookshelf={selectBookshelf}
                    setOpenDropDownId={setOpenDropDownId}
                  />
                )}

                <div className="border border-borderColor" />
                <div className="my-4 ml-8 mr-14 flex w-8/12 flex-col justify-between gap-2">
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
          );
        })}
      </ul>
      <Pagination meta={meta} currentPageNum={currentPageNum} />
      {isModalOpen && <Modal />}
    </section>
  );
}
