"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Lights, Mars } from "./_components/canvas";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-700 text-white">
      <Canvas className="h-full w-full" style={{ height: "100vh" }}>
        <OrbitControls makeDefault />
        <Lights />
        <Mars />
      </Canvas>
    </main>
  );
}
