"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookResponse } from "@/types/common";
import arrow from "/public/icons/PageArrow.svg";
import { useSearchStore } from "@/stores/searchStore";
import doubleArrow from "/public/icons/PageDoubleArrow.svg";

interface PaginationProps {
  meta: BookResponse["meta"];
  currentPageNum: number;
}

export default function Pagination({ meta, currentPageNum }: PaginationProps) {
  const router = useRouter();
  const { query, setOpenDropDownId, setCurrentPage } = useSearchStore();

  const size = 15;
  const totalCount = meta.pageable_count;
  const totalPages = Math.ceil(totalCount / size);

  const currentPage = Math.min(Math.max(currentPageNum, 1), totalPages);

  if (totalPages <= 1) return null;

  const blockSize = 10;
  const blockIndex = Math.floor((currentPage - 1) / blockSize);
  const startPage = blockIndex * blockIndex + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);

  const pagesArr: number[] = [];
  for (let p = startPage; p <= endPage; p++) {
    pagesArr.push(p);
  }

  const handlePageChange = (page: number) => {
    setOpenDropDownId(null);
    setCurrentPage(page);

    router.push(`/search?query=${encodeURIComponent(query)}&page=${page}`);

    //스크롤 위로
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const hasPrevBlock = blockIndex > 0;
  const hasNextBlock = endPage < totalPages;

  return (
    <nav className="flexCenter mt-4">
      {/* 첫 페이지 */}
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        <Image
          src={doubleArrow}
          alt="첫 페이지로 가기"
          width={30}
          height={30}
          className="-scale-x-100"
        />
      </button>

      {/* 이전 블록 */}
      {hasPrevBlock && (
        <button onClick={() => handlePageChange(startPage - 1)}>
          <Image
            src={arrow}
            alt="첫 페이지로 가기"
            width={30}
            height={30}
            className="-scale-x-100"
          />
        </button>
      )}

      {/* 페이지 번호들 */}
      {pagesArr.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={
            page === currentPage
              ? "mx-1 rounded bg-blue-500 px-2 py-1 text-white"
              : "mx-1 rounded bg-white px-2 py-1"
          }
        >
          {page}
        </button>
      ))}

      {/* 다음 블록 */}
      {hasNextBlock && (
        <button onClick={() => handlePageChange(endPage + 1)}>
          <Image src={arrow} alt="첫 페이지로 가기" width={30} height={30} />
        </button>
      )}

      {/* 마지막 페이지 */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <Image
          src={doubleArrow}
          alt="첫 페이지로 가기"
          width={30}
          height={30}
        />
      </button>
    </nav>
  );
}
