import MainCanvas from "./_components/canvas/MainCanvas";
// import UI from "./_components/ui/UI";

export default function Home() {
  return (
    <main className="flex h-full min-h-screen flex-col bg-slate-950 text-white">
      <MainCanvas />
      {/* <UI /> */}
    </main>
  );
}
