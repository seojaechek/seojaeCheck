import { Book } from "@/types/common";
import IconButton from "@/app/components/IconButton";
import bookmarkIcon from "/public/icons/Bookmark.svg";

interface BookmarkProps {
  book: Book;
  onClickBookmark: (e: React.MouseEvent, isbn: string) => void;
}

export default function Bookmark({ book, onClickBookmark }: BookmarkProps) {
  return (
    <IconButton
      type="button"
      buttonClassName="group absolute right-5 top-4 cursor-pointer"
      onClick={(e) => onClickBookmark(e, book.isbn)}
      src={bookmarkIcon}
      width={30}
      height={30}
      alt="북마크 추가"
      imgClassName='transition-transform duration-100 ease-in group-hover:scale-110"'
    />
  );
}
