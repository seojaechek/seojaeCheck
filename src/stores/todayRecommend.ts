import { create } from "zustand";

type State = {
  topic: string;
  author: string;
};

type Action = {
  updateTopic: () => void;
  updateAuthor: () => void;
};

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
const topics = [
  "미래",
  "심리",
  "역사",
  "자기계발",
  "과학",
  "철학",
  "여행",
  "건강",
  "환경",
  "요리",
  "문학",
  "예술",
  "경제",
  "사회",
  "스포츠",
];

const randomIndex = Math.floor(Math.random() * 15);

export const useTodayRecommendStore = create<State & Action>((set) => ({
  topic: topics[randomIndex],
  author: authors[randomIndex],
  updateTopic: () => set(() => ({ topic: topics[randomIndex] })),
  updateAuthor: () => set(() => ({ author: authors[randomIndex] })),
}));
