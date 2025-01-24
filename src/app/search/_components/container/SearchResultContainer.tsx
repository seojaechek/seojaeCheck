import { BookResponse } from "@/types/common";
import SearchResult from "../presentation/SearchResult";

interface ContainerProps {
  query: string;
  page: number;
  sort: string;
  searchData: BookResponse;
}

export default function SearchResultContainer({
  query,
  page,
  sort,
  searchData,
}: ContainerProps) {
  const { documents, meta } = searchData;

  // 검색어가 없을 때
  if (!query) {
    return <p className="mt-4 text-4xl font-black">검색어가 없습니다.</p>;
  }

  // query에 맞는 결과가 없을 때
  if (documents.length === 0) {
    return <p className="mt-4 text-4xl font-black">검색 결과가 없습니다.</p>;
  }

  return (
    <SearchResult
      query={query}
      page={page}
      sort={sort}
      meta={meta}
      allDocs={documents}
      currentPageNum={page}
    />
  );
}
