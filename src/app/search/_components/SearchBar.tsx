"use client";

import Image from "next/image";
import searchBtn from "/public/icons/SearchSearch.svg";
import { useSearchResult } from "@/stores/searchResult";

export default function SearchBar() {
  const { query, setQuery } = useSearchResult();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="도서 검색"
      className="mb-14 flex w-96 max-w-md rounded-lg bg-[#fefefe] p-4"
    >
      <label htmlFor="searchInput" className="sr-only">
        검색
      </label>
      <input
        type="search"
        name="search"
        value={query}
        id="searchInput"
        placeholder="Search..."
        aria-describedby="search-hint"
        className="grow text-font-textPrimary outline-none"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" aria-label="검색 버튼" className="search">
        <Image src={searchBtn} width={32} height={32} alt="검색 아이콘" />
      </button>
      <p id="search-hint" className="sr-only">
        원하는 도서를 검색하세요.
      </p>
    </form>
  );
}
