"use client";
import { Canvas } from "@react-three/fiber";
import CameraAnimation from "./CameraAnimation";
import Mars from "./Mars";
import { PointLight } from "three";
import { OrbitControls } from "@react-three/drei";
import { Environment, Text } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

export default function MainCanvas() {
  const light = new PointLight();
  light.position.set(-3, 1, 2);
  light.intensity = 50;
  return (
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
  );
}
