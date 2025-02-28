import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useCallback } from "react";

export default function Mars() {
  const measuredRef = useCallback((node: THREE.Mesh | null) => {
    if (node !== null) {
      node.geometry = new THREE.SphereGeometry(1, 512, 512);
      console.log(node);
    }
  }, []);
  return <Sphere ref={measuredRef} />;
}
