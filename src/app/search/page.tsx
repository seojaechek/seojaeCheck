import { BookResponse } from "@/types/common";
import { getBookSearch } from "@/libs/apis/searchApi";
import SearchResultContainer from "./_components/container/SearchResultContainer";

interface SearchProps {
  searchParams: {
    query?: string;
    page?: string;
    sort?: string;
  };
}

export default async function Search({ searchParams }: SearchProps) {
  const query = searchParams?.query ?? "";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const sort = searchParams?.sort ?? "accuracy";
  const searchData: BookResponse = await getBookSearch(query, page, 15, sort);

  return (
    <section className="flexCenter relative mb-10 mt-10 flex-col font-main">
      <SearchResultContainer
        query={query}
        page={page}
        sort={sort}
        searchData={searchData}
      />
    </section>
  );
}
