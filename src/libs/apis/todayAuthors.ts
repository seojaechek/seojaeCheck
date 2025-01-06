import axiosInstance from "./axiosInstance";
import authors from "@/data/authors";

export const todayAuthors = async (randomIndex: number) => {
  const res = await axiosInstance.get("/v3/search/book", {
    params: {
      query: authors[randomIndex],
      target: "person",
    },
  });

  return res.data.documents;
};
