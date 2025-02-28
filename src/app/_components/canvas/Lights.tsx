import { useHelper, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const lightRef = useRef<THREE.PointLight>(null);
  useHelper(lightRef, THREE.PointLightHelper);
  return (
    <>
      <OrbitControls
        makeDefault
        onChange={(e) => {
          if (!e) return;
          const camera = e.target.object;
          console.log(e.target.object, lightRef.current);
          if (lightRef.current) {
            lightRef.current.position.set(
              camera.position.x + 5,
              camera.position.y + 1,
              camera.position.z - 5,
            );
          }
        }}
      />
      <pointLight
        ref={lightRef}
        color="white"
        position={[5, 2, 0]}
        intensity={50}
      />
    </>
  );
}
