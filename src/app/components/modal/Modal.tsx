"use client";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import { useModalStore } from "@/stores/modal";
import useScrollLock from "@/libs/scrollLock/scrollLock";
import ModalContent from "./ModalContent";

import CloseIcon from "/public/icons/Cancel.png";
import Bookmark from "../Bookmark";

export default function Modal() {
  const { closeModal, data, isBookMark } = useModalStore();

  useEffect(() => {
    const handlePopState = () => {
      closeModal();
    };
    window.addEventListener("popstate", handlePopState);

    useScrollLock.enable(); // 스크롤 잠김
    return () => {
      useScrollLock.disable(); // 스크롤 잠김 해제
      closeModal(); // 뒤로가기 or 앞으로가기 시 모달 닫기
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
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-[600px] flex-col justify-start gap-7 border-2 border-black bg-white p-16 drop-shadow-black">
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
          <h1 className="line-clamp-1 text-4xl font-black" title={data.title}>
            {data.title}
          </h1>
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
        {isBookMark && (
          <Bookmark
            book={data}
            btnPosition={"left-5"}
            dropdownPosition={"left-5 w-1/3"}
          />
        )}
        {data.contents !== "" && (
          <div className="flex h-28 flex-col gap-3">
            <span className="text-xl font-semibold">소개</span>
            <p className="scrollbar overflow-auto text-sm font-normal">
              {data.contents}...
            </p>
          </div>
        )}
      </div>
    </div>,
    document.querySelector("#global-modal") as HTMLDivElement,
  );
}
