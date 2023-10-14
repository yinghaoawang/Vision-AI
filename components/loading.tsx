import { cn } from "@/lib/utils";

export const LoadingPage = ({
  className,
  width,
  height,
  bg,
}: {
  className?: string;
  width?: number;
  height?: number;
  bg?: string;
}) => (
  <div
    className={cn(
      "flex h-10 min-h-screen w-full items-center justify-center",
      bg || "bg-slate-900",
    )}
  >
    <LoadingSpinner className={className} width={width} height={height} />
  </div>
);

export const LoadingSpinner = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => (
  <span
    className={cn(
      "loader",
      width && `w-[${width || 30}]`,
      height && `h-[${height || 30}]`,
      className,
    )}
  />
);
