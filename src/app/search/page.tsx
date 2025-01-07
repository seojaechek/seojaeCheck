import SearchBar from "../components/SearchBar";
import SearchResult from "./_components/SearchResult";

export default function Search() {
  return (
    <section className="flexCenter mb-10 mt-20 flex-col font-main">
      <SearchBar />
      <SearchResult />
    </section>
  );
}
