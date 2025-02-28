"use client";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Pin = ({ position }: { position: THREE.Vector3 }) => {
  return (
    <Sphere position={position}>
      <meshStandardMaterial color={"blue"} />
      <sphereGeometry args={[0.01, 32, 32]} />
    </Sphere>
  );
};

export default function MarsHD() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pin, setPin] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta;
    }
  });

  const colorTexture = useTexture("/textures/mars_12k_color.jpg");
  const normalTexture = useTexture("/textures/mars_12k_normal.jpg");

  return (
    <Sphere
      ref={meshRef}
      onPointerUp={(e) => setPin(e.normal ?? new THREE.Vector3(0, 0, 0))}
    >
      <Pin position={pin} />
      <meshStandardMaterial
        map={colorTexture}
        normalMap={normalTexture}
        normalScale={[5, 5]}
      />
      <sphereGeometry args={[1, 512, 512]} />
    </Sphere>
  );
}
