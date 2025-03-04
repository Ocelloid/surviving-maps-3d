"use client";
import MainCanvas from "~/app/_components/canvas/MainCanvas";
import UI from "~/app/_components/ui/UI";
import { useEffect } from "react";
import { useStore } from "~/store";

export default function Home() {
  const { showCanvas, setShowCanvas } = useStore();
  useEffect(() => {
    if (!!window) {
      setShowCanvas(
        !(
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          ) || window.matchMedia("(max-width: 767px)").matches
        ),
      );
    }
  }, [setShowCanvas]);
  return (
    <main className="flex h-full min-h-dvh flex-col">
      {showCanvas && <MainCanvas />}
      <UI />
    </main>
  );
}
