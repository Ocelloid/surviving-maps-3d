import MainCanvas from "./_components/canvas/MainCanvas";
import Menu from "./_components/menu/Menu";

export default function Home() {
  return (
    <main className="flex h-full min-h-screen flex-col bg-slate-950 text-white">
      <MainCanvas />
      <Menu />
    </main>
  );
}
