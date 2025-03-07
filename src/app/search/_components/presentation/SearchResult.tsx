import BookItem from "./BookItem";
import SortSearch from "../SortSelect";
import Pagination from "../Pagination";

import { Book, BookResponse } from "@/types/common";

interface SearchResultProps {
  query: string;
  page: number;
  sort: string;

  meta: BookResponse["meta"];
  allDocs: Book[];
  currentPageNum: number;
}

export default function SearchResult({
  query,
  page,
  sort,
  meta,
  allDocs,
  currentPageNum,
}: SearchResultProps) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center md:w-4/5">
      <SortSearch query={query} page={page} sort={sort} />
      <ul className="flex w-full flex-col md:gap-5">
        {allDocs.map((book) => {
          return <BookItem key={book.isbn} book={book} />;
        })}
      </ul>
      <Pagination meta={meta} currentPageNum={currentPageNum} />
    </section>
  );
}
