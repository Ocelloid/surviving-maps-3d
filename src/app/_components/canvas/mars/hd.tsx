"use client";
import { Sphere, useTexture } from "@react-three/drei";

export default function MarsHD() {
  const colorTexture = useTexture("/textures/mars_12k_color.jpg");
  const normalTexture = useTexture("/textures/mars_12k_normal.jpg");
  return (
    <Sphere>
      <meshStandardMaterial map={colorTexture} normalMap={normalTexture} />
      <sphereGeometry args={[1, 512, 512]} />
    </Sphere>
  );
}
