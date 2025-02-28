/* eslint-disable jsx-a11y/alt-text */
"use client";
import { Image, Text } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Pin({
  pin,
  coord,
}: {
  pin: THREE.Vector3;
  coord: THREE.Vector2;
}) {
  const pinRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (pinRef.current) {
      pinRef.current.lookAt(new THREE.Vector3(0, 0, 0));
    }
  });
  return (
    <group position={pin} scale={0.03} ref={pinRef}>
      <mesh position={[0, 0, 0]}>
        <meshStandardMaterial
          color={"lightskyblue"}
          opacity={0.75}
          transparent
        />
        <torusGeometry args={[0.5, 0.1, 6, 6]} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <meshStandardMaterial
          color={"lightskyblue"}
          opacity={0.5}
          transparent
        />
        <torusGeometry args={[0.75, 0.025, 6, 6]} />
      </mesh>
      <Text
        rotation={[0, Math.PI, 0]}
        position={[0, -1.5, -0.25]}
        color={"lightskyblue"}
        outlineColor={"black"}
        outlineWidth={0.05}
      >
        {Math.abs(coord.y)}
        {coord.y > 0 ? "°N " : "°S "}
        {Math.abs(coord.x)}
        {coord.x > 0 ? "°E" : "°W"}
      </Text>
      <group position={[0, -2.5, -0.25]} rotation={[0, Math.PI, 0]}>
        <Image
          url="/lmb.png"
          side={THREE.DoubleSide}
          transparent
          scale={[0.35, 0.5]}
          position={[-2.5, 0, 0]}
        />
        <Text
          position={[-1, 0, 0]}
          color={"lightskyblue"}
          outlineColor={"black"}
          outlineWidth={0.025}
          scale={0.5}
        >
          Move Spot
        </Text>
        <Image
          url="/rmb.png"
          side={THREE.DoubleSide}
          transparent
          scale={[0.35, 0.5]}
          position={[1, 0, 0]}
        />
        <Text
          position={[2, 0, 0]}
          color={"lightskyblue"}
          outlineColor={"black"}
          outlineWidth={0.025}
          scale={0.5}
        >
          Rotate
        </Text>
      </group>
    </group>
  );
}
