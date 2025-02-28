"use client";
import { Sphere, useTexture } from "@react-three/drei";
import type * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Mars() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    // console.log(_state, delta);
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta;
    }
  });

  const colorTexture = useTexture("/textures/mars_12k_color.jpg");
  const normalTexture = useTexture("/textures/mars_12k_normal.jpg");

  return (
    <Sphere ref={meshRef}>
      <meshStandardMaterial
        map={colorTexture}
        normalMap={normalTexture}
        normalScale={[5, 5]}
      />
      <sphereGeometry args={[1, 512, 512]} />
    </Sphere>
  );
}
