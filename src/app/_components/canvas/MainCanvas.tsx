"use client";
import { Canvas } from "@react-three/fiber";
import CameraAnimation from "./CameraAnimation";
import Mars from "./Mars";
import { PointLight } from "three";
import { OrbitControls } from "@react-three/drei";
import { Environment, Text } from "@react-three/drei";
import { Suspense, useState } from "react";
import * as THREE from "three";

export default function MainCanvas() {
  const [lastCameraPosition, setLastCameraPosition] = useState(
    new THREE.Vector3(1, 1, -1),
  );
  const light = new PointLight();
  light.position.set(-3, 1, 2);
  light.intensity = 100;

  const sun = new PointLight();
  sun.position.set(-5, 1, -5);
  sun.intensity = 500;

  return (
    <Canvas
      className="h-full w-full"
      style={{ height: "100vh" }}
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
        <OrbitControls
          onChange={(e) => {
            const cam = e?.target?.object;
            if (!cam) return;
            if (cam?.position.distanceTo(new THREE.Vector3(0, 0, 0)) < 1.1) {
              cam.position.set(
                lastCameraPosition.x,
                lastCameraPosition.y,
                lastCameraPosition.z,
              );
            } else {
              setLastCameraPosition(
                new THREE.Vector3(
                  cam.position.x,
                  cam.position.y,
                  cam.position.z,
                ),
              );
            }
          }}
        />
        <Mars />
      </Suspense>
    </Canvas>
  );
}
