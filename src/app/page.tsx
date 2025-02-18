import Carousel from "./components/home/Carousel";

import topics from "@/data/topics";
import authors from "@/data/authors";
import { todayTopic } from "@/libs/apis/todayTopic";
import { todayAuthors } from "@/libs/apis/todayAuthors";
import GetIndex from "@/libs/isr/GetIndex";

export default async function Home() {
  const index = GetIndex();

  const bookData = {
    topic: await todayTopic(index),
    author: await todayAuthors(index),
  };

  return (
    <main className="mt-20 flex w-full flex-col items-center gap-4">
      <div className="flex w-2/3 flex-col gap-4 px-5 py-3">
        <div className="flex items-center gap-7">
          <h1 className="text-2xl font-bold">오늘의 주제</h1>
          <h3 className="text-xl font-semibold">{topics[index]}</h3>
        </div>
        <Carousel books={bookData.topic} isModal={true} />
        <div className="flex items-center gap-7">
          <h1 className="text-2xl font-bold">오늘의 작가</h1>
          <h3 className="text-xl font-semibold">{authors[index]}</h3>
        </div>
        <Carousel books={bookData.author} isModal={false} />
      </div>
    </main>
  );
}
