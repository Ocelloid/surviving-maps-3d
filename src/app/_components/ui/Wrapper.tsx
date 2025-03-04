import type { CSSProperties } from "react";

export default function Wrapper({
  style,
  children,
  className,
}: {
  style?: CSSProperties;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`z-10 flex w-full flex-col md:h-full ${className}`}
      style={style}
    >
      <div className="bevel-clip-sm flex h-full flex-grow flex-col rounded-tl-3xl bg-blue-700/25 p-4">
        {children}
      </div>
    </div>
  );
}
