"use client";

import { useCountStore } from "@/stores/counter";

export default function Page() {
  const { count, decrease, increase } = useCountStore((state) => state);

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-4">
      <h1>
        Counter <span>{count}</span>
      </h1>

      <div className="flex gap-2">
        <button
          onClick={increase}
          className="rounded-md border border-white p-1.5 font-medium"
        >
          Increase
        </button>
        <button
          onClick={decrease}
          className="rounded-md border border-white p-1.5 font-medium"
        >
          Decrease
        </button>
      </div>
    </div>
  );
}
