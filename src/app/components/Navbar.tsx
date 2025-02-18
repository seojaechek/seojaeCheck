"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSearchStore } from "@/stores/searchStore";
import SearchBar from "./SearchBar";
import { InvalidateHomeData } from "../action/invalidateHomeData";

import Logo from "/public/Logo.png";
import BookIcon from "/public/icons/Books.png";

export default function Navbar() {
  const router = useRouter();
  const { resetSearchState } = useSearchStore();

  useEffect(() => {
    revalidateData();
  }, []);

  const revalidateData = async () => {
    const currentDate = new Date().getDate();

    if (localStorage.getItem("date") !== currentDate.toString()) {
      await InvalidateHomeData();
      localStorage.setItem("date", currentDate.toString());
    }
  };

  const handleHomeClick = async () => {
    if (window.location.pathname === "/") {
      return;
    }
    await revalidateData();
    resetSearchState();
    router.push("/");
  };

  return (
    <div className="flex w-full items-center justify-between border-b-2 border-borderColor bg-navbar p-4">
      <Image
        className="cursor-pointer"
        src={Logo}
        alt="Logo"
        width={75}
        height={75}
        priority={true}
        style={{ width: 75, height: 75 }}
        onClick={handleHomeClick}
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
