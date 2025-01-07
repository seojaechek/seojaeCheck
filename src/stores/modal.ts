import { create } from "zustand";
import { Book } from "@/types/common";
import axiosInstance from "@/libs/apis/axiosInstance";

interface States {
  isOpen: boolean;
  data: Book | undefined;
}

interface Actions {
  openModal: (data: Book | string) => void;
  closeModal: () => void;
}

const getDetailByIsbn = async (isbn: string): Promise<Book> => {
  const res = await axiosInstance.get("/v3/search/book", {
    params: {
      target: "isbn",
      query: isbn,
    },
  });

  const data = res.data.documents;

  return data[0];
};

export const useModalStore = create<States & Actions>((set) => ({
  isOpen: false,
  data: undefined,
  openModal: async (data: Book | string) => {
    set(() => ({ isOpen: true }));

    if (typeof data === "string") {
      const detail = await getDetailByIsbn(data);
      set(() => ({ data: detail }));
    } else {
      set(() => ({ data: data }));
    }
  },
  closeModal: () => {
    set(() => ({ isOpen: false, data: undefined }));
  },
}));
