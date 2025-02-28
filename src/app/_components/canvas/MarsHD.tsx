"use client";
import { Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const convertUVtoCoordinates = (uv: THREE.Vector2) => {
  const x = Number((360 * uv.x - 180).toFixed(0));
  const y = Number((180 * uv.y - 90).toFixed(0));
  return { x, y };
};

export default function MarsHD() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pinRef = useRef<THREE.Group>(null);
  const [pin, setPin] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const camera = useThree((state) => state.camera);
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta;
    }
    if (pinRef.current) {
      pinRef.current.lookAt(camera.position);
    }
  });

  const colorTexture = useTexture("/textures/mars_12k_color.jpg");
  const normalTexture = useTexture("/textures/mars_12k_normal.jpg");

  return (
    <mesh ref={meshRef}>
      <group position={pin} scale={0.01} ref={pinRef}>
        <Text position={[0, 0, 3]}>
          x:{coord.x}
          {"\n"}y:{coord.y}
        </Text>
        <mesh>
          <meshStandardMaterial color={"blue"} />
          <sphereGeometry args={[1, 32, 32]} />
        </mesh>
      </group>
      <mesh
        onPointerDown={(e) => {
          setPin(e.normal ?? new THREE.Vector3(0, 0, 0));
          setCoord(convertUVtoCoordinates(e.uv ?? new THREE.Vector2(0, 0)));
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
