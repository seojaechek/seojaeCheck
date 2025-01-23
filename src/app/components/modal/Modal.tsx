"use client";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import { useModalStore } from "@/stores/modal";
import ModalContent from "./ModalContent";

import CloseIcon from "/public/icons/Cancel.png";
import Bookmark from "../Bookmark";

export default function Modal() {
  const { closeModal, data } = useModalStore();

  useEffect(() => {
    const body = document.body as HTMLBodyElement;
    body.classList.add("modal-open");

    const handlePopState = () => {
      closeModal();
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      body.classList.remove("modal-open");
    };
  }, []);

  if (!data) {
    return null;
  }

  const contentList = [
    { title: "작가", content: data.authors },
    { title: "번역", content: data.translators },
    { title: "출판사", content: data.publisher },
    { title: "ISBN", content: data.isbn.split(" ")[0] },
  ];

  return createPortal(
    <>
      {data && (
        <div className="fixed z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
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
              {contentList.map((data) => {
                return (
                  <ModalContent
                    key={data.title}
                    title={data.title}
                    content={data.content}
                  />
                );
              })}
            </div>
            <Bookmark book={data} modalStyle="left-5" />
            {data.contents !== "" && (
              <div className="flex h-24 flex-col gap-3">
                <span className="text-xl font-semibold">소개</span>
                <p className="line-clamp-3 text-sm font-normal">
                  {data.contents}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>,
    document.querySelector("#global-modal") as HTMLDivElement,
  );
}
