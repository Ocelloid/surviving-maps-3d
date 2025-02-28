"use client";
import { Sphere, useTexture } from "@react-three/drei";
import type * as THREE from "three";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import MarsHD from "./Planet";

export default function Mars() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta;
    }
  });

  const colorTexture = useTexture("/textures/mars_1k_color.jpg");
  const normalTexture = useTexture("/textures/mars_1k_normal.jpg");

  // const geometry = new THREE.SphereGeometry(1.01, 180, 141);
  // const material = new THREE.LineBasicMaterial({ color: 0xd3d3d3 });
  // const wireframe = new THREE.EdgesGeometry(geometry);

  return (
    <Suspense
      fallback={
        <Sphere>
          <meshStandardMaterial map={colorTexture} normalMap={normalTexture} />
          <sphereGeometry args={[1, 512, 512]} />
        </Sphere>
      }
    >
      {/* <Sphere ref={meshRef}>
        <lineBasicMaterial color={0xd3d3d3} />
        <lineSegments args={[wireframe, material]} />
      </Sphere> */}
      <MarsHD />
    </Suspense>
  );
}
