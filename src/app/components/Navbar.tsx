"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "/public/Logo.png";
import BookIcon from "/public/icons/Books.png";

import { useSearchStore } from "@/stores/searchStore";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const router = useRouter();
  const { resetSearchState } = useSearchStore();

  return (
    <div className="flex w-full items-center justify-between border-b-2 border-borderColor bg-navbar px-2 py-3 md:p-4">
      <picture className="relative h-14 w-14 md:h-16 md:w-16">
        <Image
          className="cursor-pointer"
          src={Logo}
          alt="Logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          priority={true}
          onClick={() => {
            resetSearchState();
            router.push("/");
          }}
        />
      </picture>

      <SearchBar />
      <picture className="relative h-8 w-8 md:h-11 md:w-11">
        <Image
          className="cursor-pointer"
          src={BookIcon}
          fill
          alt="books"
          onClick={() => {
            resetSearchState();
            router.push("/bookshelf");
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
      </picture>
    </div>
  );
}
