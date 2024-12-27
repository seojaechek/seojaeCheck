import axiosInstance from "./axiosInstance";

export const todayTopic = async () => {
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
        "스포츠"
      ];
      const randomIndex = Math.floor(Math.random() * topics.length)      
    const res = await axiosInstance.get('/v3/search/book', {
        params: {
            query: topics[randomIndex],
        }
    })

    return res.data.documents
}