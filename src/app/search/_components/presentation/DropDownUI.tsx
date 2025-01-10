interface DropDownProps {
  selectedBookshelf: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function DropDownUI({
  selectedBookshelf,
  handleSelectChange,
  handleConfirm,
  handleCancel,
}: DropDownProps) {
  return (
    <form
      action=""
      className="absolute right-5 top-12 z-10 flex flex-col items-center gap-3 rounded border bg-white p-5 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <label className="mr-2 text-sm font-semibold">
        어느 서재에 담을까요?
      </label>
      <select
        name="bookshelves"
        id="bookshelf-select"
        value={selectedBookshelf}
        onChange={handleSelectChange}
        className="w-full border px-2 py-1 text-sm"
      >
        <option value="">-- 서재 선택 --</option>
        <option value="root">읽고 싶은 책</option>
        <option value="container1">읽고 있는 책</option>
        <option value="container2">다 읽은 책</option>
      </select>
      <div className="flex w-full items-center justify-between gap-2">
        <button
          onClick={handleConfirm}
          className="w-full rounded bg-font-textPrimary px-2 py-1 text-sm text-brown-1"
        >
          추가
        </button>
        <button
          className="w-full rounded bg-gray-300 px-2 py-1 text-sm text-black"
          onClick={handleCancel}
        >
          취소
        </button>
      </div>
    </form>
  );
}
