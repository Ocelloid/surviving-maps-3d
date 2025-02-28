"use client";
import { Canvas } from "@react-three/fiber";
import { Mars } from "./_components/canvas";
import { PointLight } from "three";
import { OrbitControls } from "@react-three/drei";
import { Environment, Text } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const CameraAnimation = () => {
  const [animate, setAnimate] = useState(false);
  const vec = new THREE.Vector3(1, 1, -1);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useFrame((state) => {
    if (animate) {
      state.camera.lookAt(0, 0, 0);
      state.camera.position.lerp(vec, 0.016);
      if (state.camera.position.distanceTo(vec) < 0.1) {
        setAnimate(false);
      }
    }
    return null;
  });
  return null;
};

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
        <Suspense fallback={<Text>Loading...</Text>}>
          <CameraAnimation />
          <Environment
            files={"/textures/environment.hdr"}
            background
            backgroundBlurriness={0.025}
          />
          <OrbitControls
            onChange={(e) => {
              const cam = e?.target?.object;
              console.log(cam?.position.distanceTo(new THREE.Vector3(0, 0, 0)));
              if (
                cam &&
                cam.position.distanceTo(new THREE.Vector3(0, 0, 0)) < 1.1
              ) {
                cam.position.set(0.66, 0.66, -0.66);
              }
            }}
          />
          <Mars />
        </Suspense>
      </Canvas>
    </main>
  );
}
