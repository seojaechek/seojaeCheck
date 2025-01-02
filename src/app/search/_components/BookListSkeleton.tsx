import Skeleton from "@/app/components/Skeleton";

export default function BookListSkeleton() {
  return (
    <ul className="w-full max-w-4xl space-y-4">
      {[...Array(3)].map((_, i) => (
        <li key={i} className="flex rounded border p-4">
          <Skeleton className="mr-4 h-32 w-24" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </li>
      ))}
    </ul>
  );
}
