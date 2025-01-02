"use client";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import { useModalStore } from "@/stores/modal";
import { Book } from "@/types/common";

import CloseIcon from "/public/icons/Cancel.png";

export default function Modal({ detail }: { detail: Book }) {
  const { closeModal } = useModalStore();

  useEffect(() => {
    const body = document.body as HTMLBodyElement;
    const carousels = document.querySelectorAll(".carousel");

    body.classList.add("modal-open");
    if (carousels) {
      carousels.forEach((carousel) => carousel.classList.add("pause"));
    }

    return () => {
      body.classList.remove("modal-open");
      if (carousels) {
        carousels.forEach((carousel) => carousel.classList.remove("pause"));
      }
    };
  }, []);

  return createPortal(
    <div className="fixed z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex h-[610px] w-[600px] flex-col justify-start gap-7 border-2 border-black bg-white p-16 drop-shadow-black">
        <Image
          onClick={closeModal}
          src={CloseIcon}
          sizes="48"
          alt="closeIcon"
          className="absolute right-3 top-3"
        />
        <div className="relative h-[241px] w-[174px] border-2 border-black bg-inherit drop-shadow-black">
          <Image src={detail.thumbnail} fill alt={detail.title} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="line-clamp-1 text-4xl font-black">{detail.title}</h1>
          <div className="flex gap-7">
            <span className="w-10 text-sm font-normal">작가</span>
            <span className="text-sm font-semibold">{detail.authors}</span>
          </div>
          {detail.translators.length !== 0 && (
            <div className="flex gap-7">
              <span className="w-10 text-sm font-normal">번역</span>
              <span className="text-sm font-semibold">
                {detail.translators}
              </span>
            </div>
          )}
          <div className="flex gap-7">
            <span className="text-sm font-normal">출판사</span>
            <span className="text-sm font-semibold">{detail.publisher}</span>
          </div>
          <div className="flex gap-7">
            <span className="text-sm font-normal">ISBN</span>
            <span className="text-sm font-semibold">{detail.isbn}</span>
          </div>
        </div>
        <div className="flex h-24 flex-col gap-3">
          <span className="text-xl font-semibold">소개</span>
          <p className="line-clamp-3 text-sm font-normal">{detail.contents}</p>
        </div>
      </div>
    </div>,
    document.querySelector("#global-modal") as HTMLDivElement,
  );
}
