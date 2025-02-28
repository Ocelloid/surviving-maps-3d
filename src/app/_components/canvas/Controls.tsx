"use client";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
export default function Controls() {
  const [lastCameraPosition, setLastCameraPosition] = useState(
    new THREE.Vector3(1.5, 1, -1.5),
  );
  return (
    <OrbitControls
      enablePan={false}
      onChange={(e) => {
        const cam = e?.target?.object;
        if (!cam) return;
        if (cam?.position.distanceTo(new THREE.Vector3(0, 0, 0)) < 1.25) {
          cam.position.set(
            lastCameraPosition.x,
            lastCameraPosition.y,
            lastCameraPosition.z,
          );
        } else {
          setLastCameraPosition(
            new THREE.Vector3(cam.position.x, cam.position.y, cam.position.z),
          );
        }
      }}
    />
  );
}
