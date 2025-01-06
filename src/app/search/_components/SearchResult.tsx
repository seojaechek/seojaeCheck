"use client";

import Image from "next/image";
import { Book } from "@/types/common";
import Bookmark from "./Bookmark";
import BookListSkeleton from "./BookListSkeleton";
import { useSearchResultQuery } from "@/hooks/useSearchResult";

export default function SearchResult() {
  const { data, isLoading, isFetching } = useSearchResultQuery();
  return (
    <>
      {isLoading || isFetching ? (
        <BookListSkeleton />
      ) : (
        <ul className="flex flex-col items-center gap-5">
          {data?.documents.map((el: Book) => {
            return (
              <li key={el.isbn} className="searchList">
                <article className="relative flex justify-center">
                  <picture className="flexCenter relative mx-8 my-3 h-60 w-40 shadow-md">
                    <Image src={el.thumbnail} fill alt={`${el.title} 표지`} />
                  </picture>

                  <Bookmark />
                  <div className="border border-border" />
                  <div className="my-4 ml-8 mr-12 flex w-8/12 flex-col justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      <h2 className="font-styled text-2xl font-extrabold text-font-textPrimary">
                        {el.title}
                      </h2>
                      <p className="line-clamp-3 text-sm font-medium text-font-textSecondary">
                        {el.contents}
                      </p>
                    </div>

                    <dl className="grid gap-2 text-sm leading-5 text-font-textPrimary">
                      <div className="flex">
                        <dt className="searchDetail">작가</dt>
                        <dd className="font-semibold">{el.authors}</dd>
                      </div>
                      {el.translators && el.translators.length > 0 ? (
                        <div className="flex">
                          <dt className="searchDetail">번역</dt>
                          <dd className="font-semibold">{el.translators}</dd>
                        </div>
                      ) : null}

                      <div className="flex">
                        <dt className="searchDetail">출판사</dt>
                        <dd className="font-semibold">{el.publisher}</dd>
                      </div>
                      <div className="flex">
                        <dt className="searchDetail">출판 날짜</dt>
                        <dd className="font-semibold">
                          {el.datetime
                            ? new Date(el.datetime).toISOString().split("T")[0]
                            : "날짜 없음"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
