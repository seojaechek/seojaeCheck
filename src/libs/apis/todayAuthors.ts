import authors from "@/data/authors";

export const todayAuthors = async (randomIndex: number) => {
  const now = new Date();
  const setTime = new Date();
  setTime.setHours(24, 0, 0);

  console.log("now", now.toUTCString(), "setTime", setTime.toUTCString());

  const revalidationTime =
    (Date.parse(setTime.toUTCString()) - Date.parse(now.toUTCString())) / 1000;

  console.log(revalidationTime);

  const query = authors[randomIndex];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}v3/search/book?query=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
      },
      next: { revalidate: revalidationTime },
    },
  );

  const data = await res.json();

  return data.documents;
};
