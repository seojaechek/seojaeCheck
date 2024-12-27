"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { todayTopic } from "@/libs/apis/todayTopic";
import { todayAuthors } from "../libs/apis/todayAuthors";
import Carusel from "./components/Carusel";

import Search from "/public/icons/SearchWhite.png";

export default function Home() {
  const booksOfTopic = useQuery({
    queryKey: ["bookOfTopic"],
    queryFn: () => todayTopic(),
  });
  const booksOfAuthor = useQuery({
    queryKey: ["bookOfAuthor"],
    queryFn: () => todayAuthors(),
  });

  return (
    <main className="mt-[121px] flex w-full flex-col items-center gap-4">
      <div className="flex size-[150px] flex-col items-center justify-center rounded-full bg-black">
        <Image src={Search} width={58} height={51} alt="Go to search" />
        <span className="text-white">Go to search</span>
      </div>
      <div className="flex w-2/3 flex-col items-center justify-center gap-4 px-5 py-3">
        <h1 className="w-full text-left">오늘의 토픽</h1>
        {booksOfTopic.data && <Carusel books={booksOfTopic.data} />}
        <h1 className="w-full text-left">오늘의 작가</h1>
        {booksOfAuthor.data && <Carusel books={booksOfAuthor.data} />}
      </div>
    </main>
  );
}
