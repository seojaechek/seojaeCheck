import React from "react";

interface SpinnerProps {
  size: "sm" | "md" | "lg" | "xl";
}

export default function Spinner({ size }: SpinnerProps) {
  // 스피너 크기 -> 필요시 수정!
  // 사용법 <Spinner size="sm" /> 사이즈 명기
  const customSize = {
    sm: "w-8 h-8 border-4",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-8",
    xl: "w-20 h-20 border-8",
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={`border-gray-500 ${customSize[size]} animate-spin rounded-full border-t-transparent`}
      ></div>
    </div>
  );
}
