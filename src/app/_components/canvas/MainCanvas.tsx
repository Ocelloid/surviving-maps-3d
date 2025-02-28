"use client";
import { Canvas } from "@react-three/fiber";
import CameraAnimation from "./CameraAnimation";
import Mars from "./Mars";
import { PointLight } from "three";
import { Environment, Text } from "@react-three/drei";
import { Suspense } from "react";
import Controls from "./Controls";

export default function MainCanvas() {
  const light = new PointLight("white", 100);
  light.position.set(-3, 1, 2);

  const sun = new PointLight("lightyellow", 500);
  sun.position.set(-5, 1, -5);

  return (
    <Canvas
      style={{
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
      onCreated={({ camera, scene }) => {
        camera.add(sun);
        camera.add(light);
        scene.add(camera);
      }}
    >
      <Suspense fallback={<Text>Loading...</Text>}>
        <CameraAnimation />
        <Environment
          files={"/textures/environment.hdr"}
          background
          backgroundBlurriness={0.025}
        />
        <Controls />
        <Mars />
      </Suspense>
    </Canvas>
  );
}
