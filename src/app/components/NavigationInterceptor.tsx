"use client";
import { useModalStore } from "@/stores/modal";
import { useEffect } from "react";

export default function NavigationInterceptor() {
  const { isOpen, closeModal } = useModalStore();

  const handleModalClose = () => {
    closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("popstate", handleModalClose);
    }

    return () => {
      console.log("unmount navigationInterceptor");
      removeEventListener("popstate", handleModalClose);
    };
  }, [isOpen]);

  return null;
}
