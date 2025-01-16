"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "/public/logo.png";
import BookIcon from "/public/icons/Books.png";
import { useSearchStore } from "@/stores/searchStore";

export default function Navbar() {
  const router = useRouter();
  const { resetSearchState } = useSearchStore();

  return (
    <div className="flex h-[100px] w-full items-center justify-between bg-navbar">
      <Image
        className="cursor-pointer"
        src={Logo}
        sizes="100"
        priority={true}
        alt="Logo"
        onClick={() => {
          resetSearchState();
          router.push("/");
        }}
      />
      <div className="flex w-10">
        <Image
          className="cursor-pointer"
          src={BookIcon}
          sizes="28"
          alt="books"
          onClick={() => {
            resetSearchState();
            router.push("/bookshelf");
          }}
        />
      </div>
    </div>
  );
}
