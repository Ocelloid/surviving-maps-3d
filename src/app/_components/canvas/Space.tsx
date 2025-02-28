import { Environment } from "@react-three/drei";

const CUBEMAP_URLS = [
  "textures/cubemap/px.png",
  "textures/cubemap/nx.png",
  "textures/cubemap/py.png",
  "textures/cubemap/ny.png",
  "textures/cubemap/pz.png",
  "textures/cubemap/nz.png",
];

export default function Space() {
  return (
    <Environment
      files={CUBEMAP_URLS}
      background
      backgroundIntensity={1}
      environmentIntensity={1}
    />
  );
}
