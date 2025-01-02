export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-300 ${className}`}
      aria-busy="true"
      aria-label="Loading.."
    />
  );
}
