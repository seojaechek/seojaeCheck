"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/stores/searchStore";
import searchBtn from "/public/icons/SearchSearch.svg";

export default function SearchBar() {
  const router = useRouter();
  const { query, setQuery } = useSearchStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}&page=1`);
  };
  return (
    <form
      role="search"
      aria-label="도서 검색"
      onSubmit={handleSubmit}
      className="flex w-2/5 min-w-72 rounded-lg bg-white p-4 shadow-md"
    >
      <label htmlFor="searchInput" className="sr-only">
        검색
      </label>
      <input
        type="search"
        value={query}
        id="searchInput"
        placeholder="Search..."
        aria-describedby="search-hint"
        onChange={(e) => setQuery(e.target.value)}
        className="grow text-lg text-font-textPrimary outline-none"
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
