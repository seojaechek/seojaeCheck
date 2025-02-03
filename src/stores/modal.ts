import { create } from "zustand";
import { Book } from "@/types/common";
import getDetailByIsbn from "@/libs/apis/getDetailByIsbn";

interface States {
  isOpen: boolean;
  data: Book | null;
  isBookMark: boolean;
}

interface Actions {
  openModalWithData: (data: Book) => void;
  openModalWithIsbn: (isbn: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<States & Actions>((set) => ({
  isOpen: false,
  data: null,
  isBookMark: true,
  openModalWithData: (data: Book) => {
    set(() => ({ isOpen: true, data: data }));
  },
  openModalWithIsbn: async (isbn: string) => {
    const data = await getDetailByIsbn(isbn.split(" ")[0]);

    set(() => ({ isOpen: true, data: data, isBookMark: false }));
  },
  closeModal: () => {
    set(() => ({ isOpen: false, data: null, isBookMark: true }));
  },
}));
