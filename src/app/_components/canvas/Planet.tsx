"use client";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Pin from "./Pin";
import MarsSD from "./mars/sd";
import MarsMD from "./mars/md";
import { api } from "~/trpc/react";
import { useStore } from "~/store";
// import MarsHD from "./mars/hd";

const convertUVtoCoordinates = (uv: THREE.Vector2) => {
  const x = Number((360 * uv.x - 360).toFixed(0));
  const y = Number((180 * uv.y - 90).toFixed(0));
  return new THREE.Vector2(x < -180 ? x + 360 : x, y);
};

export default function Planet() {
  const { setLocation, setLocationLoading, setCoordinates } = useStore();
  const meshRef = useRef<THREE.Mesh>(null);
  const [pin, setPin] = useState<THREE.Vector3>(
    new THREE.Vector3(
      0.6546557125770007,
      0.3166304348005583,
      -0.6864056397686533,
    ),
  );
  const [coord, setCoord] = useState<THREE.Vector2>(
    new THREE.Vector2(-134, 18),
  );

  const {
    data: locationDetails,
    isLoading: isLoadingLocationDetails,
    refetch: refetchLocation,
  } = api.location.getLocationByCoords.useQuery(
    {
      lat_deg: Math.abs(coord.y).toString(),
      lat_dir: coord.y > 0 ? "N" : "S",
      lon_deg: Math.abs(coord.x).toString(),
      lon_dir: coord.x > 0 ? "E" : "W",
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );

  useEffect(() => {
    if (locationDetails && !isLoadingLocationDetails) {
      setLocation(locationDetails);
    }
  }, [locationDetails, setLocation, isLoadingLocationDetails]);

  useEffect(() => {
    setLocationLoading(isLoadingLocationDetails);
  }, [setLocationLoading, isLoadingLocationDetails]);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Pin pin={pin} coord={coord} />
      <group
        onClick={(e) => {
          const newCoord = convertUVtoCoordinates(
            e.uv ?? new THREE.Vector2(0, 0),
          );
          if (Math.abs(newCoord.y) <= 70) {
            setPin(e.normal ?? new THREE.Vector3(0, 0, 0));
            setCoordinates(
              `${newCoord.y > 0 ? "N" : "S"} ${Math.abs(newCoord.y).toString()} ${newCoord.x > 0 ? "E" : "W"} ${Math.abs(newCoord.x).toString()}`,
            );
            setCoord(newCoord);
            void refetchLocation();
          }
        }}
      >
        <Suspense fallback={<MarsSD />}>
          {/* <Suspense fallback={<MarsMD />}> */}
          <MarsMD />
          {/* </Suspense> */}
        </Suspense>
      </group>
    </mesh>
  );
}
