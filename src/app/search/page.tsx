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

  let searchData: BookResponse | null = null;
  let errorMessage: string | null = null;

  try {
    searchData = await getBookSearch(query, page, 15, sort);
  } catch (error) {
    errorMessage =
      (error as Error).message ||
      "검색한 책을 불러오지 못했습니다! 다시 시도해주세요.";
  }

  return (
    <section className="relative my-10 flex-col font-main">
      {errorMessage ? (
        <div className="text-center font-styled text-2xl font-bold text-font-textPrimary">
          <p className="mb-2">책 데이터를 불러오는 중 문제가 발생했습니다..</p>
          <p>{errorMessage}</p>
        </div>
      ) : (
        searchData && (
          <SearchResultContainer
            query={query}
            page={page}
            sort={sort}
            searchData={searchData}
          />
        )
      )}
    </section>
  );
}
