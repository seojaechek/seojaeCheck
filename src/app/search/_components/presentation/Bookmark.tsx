import Image from "next/image";
import { Book } from "@/types/common";
import bookmarkIcon from "/public/icons/Bookmark.svg";

interface BookmarkProps {
  book: Book;
  onClickBookmark: (e: React.MouseEvent, isbn: string) => void;
}

export default function Bookmark({ book, onClickBookmark }: BookmarkProps) {
  return (
    <>
      <button
        type="button"
        className="group absolute right-5 top-4 cursor-pointer"
        onClick={(e) => onClickBookmark(e, book.isbn)}
      >
        <Image
          src={bookmarkIcon}
          width={30}
          height={30}
          alt="북마크 추가"
          className="transition-transform duration-100 ease-in group-hover:scale-110"
        />
      </button>
    </>
  );
}
