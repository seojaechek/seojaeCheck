import Image from "next/image";
import Bookmark from "./_components/Bookmark";
import { storedBook } from "@/mock/bookshelf";
import SearchBar from "./_components/SearchBar";

export default function Search() {
  return (
    <section className="flexCenter mb-10 mt-20 flex-col font-main">
      <SearchBar />
      <ul className="flex flex-col items-center gap-5">
        {storedBook.map((el, index) => {
          return (
            <li key={index} className="searchList">
              <article className="relative flex justify-center">
                <picture className="flexCenter relative mx-8 my-3 w-48 shadow-md">
                  <Image src={el.thumbnail} fill alt="북커버" />
                </picture>

                <Bookmark />
                <div className="border border-border" />
                <div className="mx-8 my-4 flex w-8/12 flex-col gap-2">
                  <h2 className="font-styled text-2xl font-extrabold text-font-textPrimary">
                    {el.title}
                  </h2>
                  <p className="flex-grow text-sm font-medium text-font-textSecondary">
                    {el.contents}
                  </p>
                  <dl className="grid gap-2 text-sm leading-5 text-font-textPrimary">
                    <div className="flex">
                      <dt className="searchDetail">작가</dt>
                      <dd className="font-semibold">{el.authors}</dd>
                    </div>
                    <div className="flex">
                      <dt className="searchDetail">번역</dt>
                      <dd className="font-semibold">{el.translators}</dd>
                    </div>
                    <div className="flex">
                      <dt className="searchDetail">출판사</dt>
                      <dd className="font-semibold">{el.publisher}</dd>
                    </div>
                    <div className="flex">
                      <dt className="searchDetail">출판 날짜</dt>
                      <dd className="font-semibold">{el.datetime}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
