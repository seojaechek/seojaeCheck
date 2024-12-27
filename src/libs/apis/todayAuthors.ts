import axiosInstance from "./axiosInstance";

export const todayAuthors = async () => {
  const authors = [
    "셰익스피어",
    "레프 톨스토이",
    "제인 오스틴",
    "마크 트웨인",
    "어니스트 헤밍웨이",
    "조지 오웰",
    "가브리엘 가르시아 마르케스",
    "해르만 헤세",
    "하퍼 리",
    "김훈",
    "박경리",
    "황순원",
    "한강",
    "김영하",
    "공지영",
    "신경숙",
    "이문열",
    "조정래",
  ];
  const randomIndex = Math.floor(Math.random() * authors.length);

  const res = await axiosInstance.get("/v3/search/book", {
    params: {
      query: authors[randomIndex],
      target: "person",
    },
  });

  return res.data.documents;
};
