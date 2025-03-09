"use client";
import { Canvas } from "@react-three/fiber";
import CameraAnimation from "./CameraAnimation";
import Planet from "./Planet";
import {
  Bloom,
  EffectComposer,
  Vignette,
  SMAA,
  ToneMapping,
} from "@react-three/postprocessing";
import { PointLight } from "three";
import Controls from "./Controls";
import Space from "./Space";

export default function MainCanvas() {
  const sun = new PointLight("white", 1000);
  sun.position.set(-4, 3, -4);

  const light = new PointLight("lightyellow", 150);
  light.position.set(-5, 1, 5);

  const backlight1 = new PointLight("orangered", 100);
  backlight1.position.set(10, 5, -15);
  const backlight2 = new PointLight("orangered", 100);
  backlight2.position.set(15, -10, -20);
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
        camera.add(backlight1);
        camera.add(backlight2);
        scene.add(camera);
      }}
    >
      <EffectComposer enableNormalPass={false}>
        <Vignette />
        <SMAA />
        <Bloom mipmapBlur luminanceThreshold={1} levels={2} intensity={0.25} />
        <ToneMapping />
      </EffectComposer>
      <CameraAnimation />
      <Controls />
      <Space />
      <Planet />
    </Canvas>
  );
}
