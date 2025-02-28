"use client";
import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Pin from "./Pin";
import MarsSD from "./mars/sd";
import MarsMD from "./mars/md";
// import MarsHD from "./mars/hd";

const convertUVtoCoordinates = (uv: THREE.Vector2) => {
  const x = Number((360 * uv.x - 360).toFixed(0));
  const y = Number((180 * uv.y - 90).toFixed(0));
  return new THREE.Vector2(x < -180 ? x + 360 : x, y);
};

export default function Planet() {
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

  return (
    <mesh ref={meshRef}>
      <Pin pin={pin} coord={coord} />
      <group
        onClick={(e) => {
          const coord = convertUVtoCoordinates(e.uv ?? new THREE.Vector2(0, 0));
          if (Math.abs(coord.y) <= 70) {
            setPin(e.normal ?? new THREE.Vector3(0, 0, 0));
            setCoord(coord);
          }
        }}
      >
        <Suspense fallback={<MarsSD />}>
          {/* <Suspense fallback={<MarsMD />}> */}
          <MarsMD />
          {/* </Suspense> */}
        </Suspense>
      </group>
    </mesh>
  );
}
