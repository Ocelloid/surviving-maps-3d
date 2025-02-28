export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight color="white" position={[0, 20, 0]} castShadow={true} />
      <directionalLight color="red" position={[5, 15, 5]} castShadow={true} />
      <directionalLight
        color="blue"
        position={[15, -5, -15]}
        castShadow={true}
      />
    </>
  );
}
