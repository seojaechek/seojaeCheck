import axiosInstance from "./axiosInstance";

import { Book } from "@/types/common";

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

export default getDetailByIsbn;
