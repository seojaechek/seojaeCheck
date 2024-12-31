import { create } from "zustand";
import { Book } from "@/types/common";

interface States {
  isOpen: boolean;
  book: Book | undefined;
}

interface Actions {
  openModal: (book: Book) => void;
  closeModal: () => void;
}

export const useModalStore = create<States & Actions>((set) => ({
  isOpen: false,
  book: undefined,
  openModal: (book: Book) => {
    set(() => ({ isOpen: true, book: book }));
  },
  closeModal: () => {
    set(() => ({ isOpen: false, book: undefined }));
  },
}));
