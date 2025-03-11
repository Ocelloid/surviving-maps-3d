"use client";
import { Sphere, useTexture } from "@react-three/drei";

export default function MarsMD() {
  const colorTexture = useTexture("/textures/mars_4k_color.jpg");
  const normalTexture = useTexture("/textures/mars_6k_normal.jpg");
  return (
    <Sphere>
      <meshStandardMaterial
        map={colorTexture}
        normalMap={normalTexture}
        normalScale={[6, 2]}
      />
      <sphereGeometry args={[1, 512, 512]} />
    </Sphere>
  );
}
