import { BookResponse } from "@/types/common";
import SearchBar from "../components/SearchBar";
import { getBookSearch } from "@/libs/apis/searchApi";
import SearchResultContainer from "./_components/container/SearchResultContainer";

interface SearchProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function Search({ searchParams }: SearchProps) {
  const query = searchParams?.query ?? "";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const searchData: BookResponse = await getBookSearch(
    query,
    page,
    15,
    "accuracy",
  );

  return (
    <section className="flexCenter mb-10 mt-20 flex-col font-main">
      <SearchBar />
      <SearchResultContainer
        query={query}
        page={page}
        searchData={searchData}
      />
    </section>
  );
}
