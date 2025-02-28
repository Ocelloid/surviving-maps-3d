"use client";
import { Sphere, useTexture } from "@react-three/drei";

export default function MarsSD() {
  const colorTexture = useTexture("/textures/mars_1k_color.jpg");
  const normalTexture = useTexture("/textures/mars_1k_normal.jpg");
  return (
    <Sphere>
      <meshStandardMaterial
        map={colorTexture}
        normalMap={normalTexture}
        normalScale={[4, 4]}
      />
      <sphereGeometry args={[1, 512, 512]} />
    </Sphere>
  );
}
