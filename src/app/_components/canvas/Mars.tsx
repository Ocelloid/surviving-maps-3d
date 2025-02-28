"use client";
import { Sphere, useTexture } from "@react-three/drei";
import type * as THREE from "three";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import MarsHD from "./MarsHD";

export default function Mars() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta;
    }
  });

  const colorTexture = useTexture("/textures/mars_1k_color.jpg");
  const normalTexture = useTexture("/textures/mars_1k_normal.jpg");

  return (
    <Suspense
      fallback={
        <Sphere ref={meshRef}>
          <meshStandardMaterial map={colorTexture} normalMap={normalTexture} />
          <sphereGeometry args={[1, 512, 512]} />
        </Sphere>
      }
    >
      <MarsHD />
    </Suspense>
  );
}
