/* eslint-disable jsx-a11y/alt-text */
"use client";
import { Image, Text } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "~/store";
import { settingsLabels } from "~/locale";

export default function Pin({
  pin,
  coord,
}: {
  pin: THREE.Vector3;
  coord: THREE.Vector2;
}) {
  const { appliedLocation, isLocationLoading, language } = useStore();
  const pinRef = useRef<THREE.Group>(null);
  const hexagonRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (pinRef.current) {
      pinRef.current.lookAt(new THREE.Vector3(0, 0, 0));
    }
    if (hexagonRef.current) {
      if (isLocationLoading) {
        hexagonRef.current.rotation.z += 0.01;
      } else hexagonRef.current.rotation.z -= 0.01;
    }
  });
  const hasName = !!appliedLocation?.namedLoc?.name_en && !isLocationLoading;
  const MOVE = settingsLabels.find((l) => l.language === language)!.labels.move;
  const ROTATE = settingsLabels.find((l) => l.language === language)!.labels
    .rotate;
  const LOC_NAME =
    language === "en"
      ? appliedLocation?.namedLoc?.name_en
      : language === "br"
        ? appliedLocation?.namedLoc?.name_br
        : language === "fr"
          ? appliedLocation?.namedLoc?.name_fr
          : language === "ge"
            ? appliedLocation?.namedLoc?.name_ge
            : language === "po"
              ? appliedLocation?.namedLoc?.name_po
              : language === "ru"
                ? appliedLocation?.namedLoc?.name_ru
                : language === "sc"
                  ? appliedLocation?.namedLoc?.name_sc
                  : language === "sp"
                    ? appliedLocation?.namedLoc?.name_sp
                    : "";
  return (
    <group position={pin} scale={0.03} ref={pinRef}>
      <group ref={hexagonRef}>
        <mesh position={[0, 0, 0]}>
          <meshStandardMaterial
            color={"lightskyblue"}
            opacity={0.5}
            transparent
          />
          <torusGeometry args={[0.5, 0.1, 6, 6]} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <meshStandardMaterial
            color={"lightskyblue"}
            opacity={0.25}
            transparent
          />
          <torusGeometry args={[0.75, 0.025, 6, 6]} />
        </mesh>
      </group>
      {hasName && (
        <Text
          position={[0, -1, -0.25]}
          rotation={[0, Math.PI, 0]}
          outlineColor={"black"}
          outlineWidth={0.05}
          color={"#facc15"}
        >
          {LOC_NAME}
        </Text>
      )}
      <Text
        rotation={[0, Math.PI, 0]}
        position={[0, -2.25 + (hasName ? 0 : 1.25), -0.25]}
        color={"lightskyblue"}
        outlineColor={"black"}
        outlineWidth={0.05}
      >
        {Math.abs(coord.y)}
        {coord.y > 0 ? "°N " : "°S "}
        {Math.abs(coord.x)}
        {coord.x > 0 ? "°E" : "°W"}
      </Text>
      <group
        position={[0, -3.25 + (hasName ? 0 : 1.25), -0.25]}
        rotation={[0, Math.PI, 0]}
      >
        <group position={[-2.5, 0, 0]}>
          <Image
            url="/lmb.png"
            side={THREE.DoubleSide}
            transparent
            scale={[0.4, 0.6]}
          />
          <Text
            position={[0.25, 0, 0]}
            color={"lightskyblue"}
            outlineColor={"black"}
            outlineWidth={0.05}
            anchorX={"left"}
            scale={0.5}
          >
            {MOVE}
          </Text>
        </group>
        <group position={[0.75, 0, 0]}>
          <Image
            url="/rmb.png"
            side={THREE.DoubleSide}
            transparent
            scale={[0.4, 0.6]}
          />
          <Text
            position={[0.25, 0, 0]}
            color={"lightskyblue"}
            outlineColor={"black"}
            outlineWidth={0.05}
            anchorX={"left"}
            scale={0.5}
          >
            {ROTATE}
          </Text>
        </group>
      </group>
    </group>
  );
}
