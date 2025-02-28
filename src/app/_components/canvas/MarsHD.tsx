"use client";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Pin from "./Pin";

const convertUVtoCoordinates = (uv: THREE.Vector2) => {
  const x = Number((360 * uv.x - 360).toFixed(0));
  const y = Number((180 * uv.y - 90).toFixed(0));
  return new THREE.Vector2(x < -180 ? x + 360 : x, y);
};

export default function MarsHD() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pin, setPin] = useState<THREE.Vector3>(
    new THREE.Vector3(
      0.6546557125770007,
      0.3166304348005583,
      -0.6864056397686533,
    ),
  );
  const [coord, setCoord] = useState<THREE.Vector2>(
    new THREE.Vector2(-134, 18),
  );

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta;
    }
  });

  const colorTexture = useTexture("/textures/mars_12k_color.jpg");
  const normalTexture = useTexture("/textures/mars_12k_normal.jpg");

  return (
    <mesh ref={meshRef}>
      <Pin pin={pin} coord={coord} />
      <mesh
        onClick={(e) => {
          const coord = convertUVtoCoordinates(e.uv ?? new THREE.Vector2(0, 0));
          if (Math.abs(coord.y) <= 70) {
            setPin(e.normal ?? new THREE.Vector3(0, 0, 0));
            setCoord(coord);
          }
        }}
      >
        <meshStandardMaterial
          map={colorTexture}
          normalMap={normalTexture}
          normalScale={[5, 5]}
        />
        <sphereGeometry args={[1, 512, 512]} />
      </mesh>
    </mesh>
  );
}
