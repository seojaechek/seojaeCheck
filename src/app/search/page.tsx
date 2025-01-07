import SearchBar from "../components/SearchBar";
import SearchResult from "./_components/SearchResult";

interface SearchProps {
  searchParams: {
    query?: string;
  };
}

export default async function Search({ searchParams }: SearchProps) {
  const query =
    typeof searchParams?.query === "string" ? searchParams.query : "";
  return (
    <section className="flexCenter mb-10 mt-20 flex-col font-main">
      <SearchBar />
      <SearchResult query={query} />
    </section>
  );
}
