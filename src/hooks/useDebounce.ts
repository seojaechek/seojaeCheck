"use client";

import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debounceValue;
}
