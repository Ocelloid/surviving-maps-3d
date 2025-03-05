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
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI - Math.PI / 4}
      mouseButtons={{ LEFT: 2, MIDDLE: 1, RIGHT: 0 }}
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
            new THREE.Vector3(cam.position.x, cam.position.y, cam.position.z),
          );
        }
      }}
    />
  );
}
