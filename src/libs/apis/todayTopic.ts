import axiosInstance from "./axiosInstance";
import topics from "@/data/topics";

export const todayTopic = async (randomIndex: number) => {
  const res = await axiosInstance.get("/v3/search/book", {
    params: {
      query: topics[randomIndex],
    },
  });

  return res.data.documents;
};
