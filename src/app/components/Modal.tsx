"use client";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import { useModalStore } from "@/stores/modal";

import CloseIcon from "/public/icons/Cancel.png";

export default function Modal() {
  const { closeModal, data } = useModalStore();

  const formatList = (data: string[]) => {
    return data.reduce(
      (init: string, author: string, i: number) =>
        i !== 0 ? init + `, ${author}` : init + author,
      "",
    );
  };

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
    <>
      {data && (
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
              <Image
                src={data.thumbnail}
                fill
                alt={data.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="line-clamp-1 text-4xl font-black">{data.title}</h1>
              <div className="flex gap-7">
                <span className="w-10 text-sm font-normal">작가</span>
                <span className="line-clamp-1 text-sm font-semibold">
                  {formatList(data.authors)}
                </span>
              </div>
              {data.translators.length !== 0 && (
                <div className="flex gap-7">
                  <span className="w-10 text-sm font-normal">번역</span>
                  <span className="text-sm font-semibold">
                    {formatList(data.translators)}
                  </span>
                </div>
              )}
              <div className="flex gap-7">
                <span className="text-sm font-normal">출판사</span>
                <span className="text-sm font-semibold">{data.publisher}</span>
              </div>
              <div className="flex gap-7">
                <span className="text-sm font-normal">ISBN</span>
                <span className="text-sm font-semibold">
                  {data.isbn.split(" ")[1]}
                </span>
              </div>
            </div>
            <div className="flex h-24 flex-col gap-3">
              <span className="text-xl font-semibold">소개</span>
              <p className="line-clamp-3 text-sm font-normal">
                {data.contents}
              </p>
            </div>
          </div>
        </div>
      )}
    </>,
    document.querySelector("#global-modal") as HTMLDivElement,
  );
}
