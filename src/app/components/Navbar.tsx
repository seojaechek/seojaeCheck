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
    <div className="flex h-[100px] w-full items-center justify-between border-b-2 border-borderColor bg-navbar px-4">
      <Image
        className="cursor-pointer"
        src={Logo}
        alt="Logo"
        width={80}
        height={80}
        priority={true}
        style={{ width: 80, height: 80 }}
        onClick={() => {
          resetSearchState();
          router.push("/");
        }}
      />
      <SearchBar />
      <Image
        className="cursor-pointer"
        src={BookIcon}
        width={45}
        height={45}
        alt="books"
        onClick={() => {
          resetSearchState();
          router.push("/bookshelf");
        }}
      />
    </div>
  );
}
