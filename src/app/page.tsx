"use client";
import { Canvas } from "@react-three/fiber";
import { Mars } from "./_components/canvas";
import { PointLight } from "three";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  const light = new PointLight();
  light.position.set(-3, 1, 2);
  light.intensity = 50;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-700 text-white">
      <Canvas
        className="h-full w-full"
        style={{ height: "100vh" }}
        onCreated={({ camera, scene }) => {
          camera.add(light);
          scene.add(camera);
        }}
      >
        <OrbitControls />
        <Mars />
      </Canvas>
    </main>
  );
}
