import type { CSSProperties } from "react";

export default function Wrapper({
  style,
  children,
}: {
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className="z-10 flex w-full flex-col md:h-full md:w-1/4" style={style}>
      <div className="bevel-clip-sm flex h-full flex-grow flex-col rounded-tl-3xl bg-blue-700/25 p-4">
        {children}
      </div>
    </div>
  );
}
