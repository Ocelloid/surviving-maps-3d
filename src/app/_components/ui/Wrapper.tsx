export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="z-10 flex w-full flex-col p-4 md:h-full md:min-h-screen md:w-1/4">
      <div className="bevel-clip flex h-full max-h-[95vh] flex-grow flex-col overflow-y-auto rounded-tl-3xl bg-violet-700/25 p-8">
        {children}
      </div>
    </div>
  );
}
