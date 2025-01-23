"use client";

import { useRouter } from "next/navigation";

interface SortProps {
  query: string;
  page: number;
  sort: string;
}

export default function SortSearch({ query, page, sort }: SortProps) {
  const router = useRouter();

  const currentSort = sort ?? "accuracy";
  const currentQuery = query ?? "";
  const currentPage = page ?? 1;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;

    router.push(
      `/search?query=${encodeURIComponent(currentQuery)}&page=${currentPage}&sort=${newSort}`,
    );
  };

  return (
    <select
      value={currentSort}
      onChange={handleSortChange}
      className="mb-3 rounded border border-borderColor p-2"
    >
      <option value="accuracy">정확도순</option>
      <option value="latest">발간일순</option>
    </select>
  );
}
