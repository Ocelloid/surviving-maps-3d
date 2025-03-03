"use client";
import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Pin from "./Pin";
import MarsSD from "./mars/sd";
import MarsMD from "./mars/md";
import { useStore, type Coordinates } from "~/store";
// import MarsHD from "./mars/hd";

const convertUVtoCoordinates = (uv: THREE.Vector2) => {
  const x = Number((360 * uv.x - 360).toFixed(0));
  const y = Number((180 * uv.y - 90).toFixed(0));
  return new THREE.Vector2(x < -180 ? x + 360 : x, y);
};

const convertAppliedCoordinatesToUV = (coord: Coordinates) => {
  const x = Number(coord.lon_deg) * (coord.lon_dir === "W" ? -1 : 1);
  const y = Number(coord.lat_deg) * (coord.lat_dir === "N" ? -1 : 1);
  return new THREE.Vector2(x, y);
};

export default function Planet() {
  const { setAppliedCoordinates, setCoordinates, appliedCoordinates } =
    useStore();
  const meshRef = useRef<THREE.Mesh>(null);
  const [pin, setPin] = useState<THREE.Vector3>(
    new THREE.Vector3(
      0.6546557125770007,
      0.3166304348005583,
      -0.6864056397686533,
    ),
  );

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Pin
        pin={pin}
        coord={
          appliedCoordinates
            ? convertAppliedCoordinatesToUV(appliedCoordinates)
            : new THREE.Vector2(0, 0)
        }
      />
      <group
        onClick={(e) => {
          const newCoord = convertUVtoCoordinates(
            e.uv ?? new THREE.Vector2(0, 0),
          );
          if (Math.abs(newCoord.y) <= 70) {
            setPin(e.normal ?? new THREE.Vector3(0, 0, 0));
            setAppliedCoordinates({
              lat_dir: newCoord.y > 0 ? "N" : "S",
              lat_deg: Math.abs(newCoord.y).toString(),
              lon_dir: newCoord.x > 0 ? "E" : "W",
              lon_deg: Math.abs(newCoord.x).toString(),
            });
            setCoordinates(
              `${newCoord.y > 0 ? "N" : "S"} ${Math.abs(newCoord.y).toString()} ${newCoord.x > 0 ? "E" : "W"} ${Math.abs(newCoord.x).toString()}`,
            );
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
