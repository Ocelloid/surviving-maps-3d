"use client";
import { useClientMediaQuery } from "~/app/api/clientMediaQuery";
import MainCanvas from "~/app/_components/canvas/MainCanvas";
import UI from "~/app/_components/ui/UI";
import { Switch } from "@heroui/react";
import { useState } from "react";

export default function Home() {
  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const [showCanvas, setShowCanvas] = useState(!isMobile);
  return (
    <main className="relative flex h-full min-h-dvh flex-col">
      {showCanvas && <MainCanvas />}
      <UI />
      <Switch
        size="lg"
        classNames={{
          base: "flex flex-row-reverse gap-2",
        }}
        isSelected={showCanvas}
        onValueChange={setShowCanvas}
        className="absolute bottom-2 right-2 z-50 text-white"
      >
        3D Map (off by default for mobile)
      </Switch>
    </main>
  );
}
