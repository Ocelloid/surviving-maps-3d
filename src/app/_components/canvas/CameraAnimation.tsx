"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function CameraAnimation() {
  const [animate, setAnimate] = useState(false);
  const vec = new THREE.Vector3(1.5, 1, -1.5);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useFrame((state) => {
    if (animate) {
      state.camera.lookAt(0, 0, 0);
      state.camera.position.lerp(vec, 0.032);
      if (state.camera.position.distanceTo(vec) < 0.115) {
        setAnimate(false);
      }
    }
    return null;
  });
  return null;
}
