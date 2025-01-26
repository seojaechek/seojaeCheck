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

  const sortOption = [
    { value: "accuracy", label: "정확도순" },
    { value: "latest", label: "발간일순" },
  ];

  const handleSortChange = (newSort: string) => {
    router.push(
      `/search?query=${encodeURIComponent(currentQuery)}&page=${currentPage}&sort=${newSort}`,
    );
  };

  return (
    <div className="my-1 flex">
      {sortOption.map((option, index) => (
        <div key={option.value} className="flex items-center">
          <button
            onClick={() => handleSortChange(option.value)}
            className={`py-1 ${
              currentSort === option.value
                ? "text-font-textPrimary"
                : "text-font-textSecondary"
            }`}
          >
            {option.label}
          </button>
          {index < sortOption.length - 1 && (
            <div className="mx-2 h-4 w-[1px] bg-borderColor"></div>
          )}
        </div>
      ))}
    </div>
  );
}
