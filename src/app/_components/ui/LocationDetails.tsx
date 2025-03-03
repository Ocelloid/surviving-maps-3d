"use client";
import Wrapper from "./Wrapper";
import { useStore } from "~/store";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import { CircularProgress, Skeleton } from "@heroui/react";

export const Rhombi = ({ value }: { value: number | null }) => {
  return (
    <div className="flex w-min flex-row gap-0.5 pl-1">
      {Array.from({ length: value ?? 0 }).map((_, i) => (
        <div
          key={"filled_" + i}
          className="h-4 w-4 -skew-x-12 rounded-sm border-1 border-indigo-200 bg-indigo-400/75"
        />
      ))}
      {Array.from({ length: 4 - (value ?? 0) }).map((_, i) => (
        <div
          key={"unfilled_" + i}
          className="h-4 w-4 -skew-x-12 rounded-sm border-1 border-indigo-200 bg-indigo-950"
        />
      ))}
    </div>
  );
};

export default function LocationDetails() {
  const {
    appliedFilter,
    appliedCoordinates,
    setLocationLoading,
    setAppliedLocation,
  } = useStore();
  console.log(appliedFilter.versionId, appliedCoordinates);
  const { data: locData, isLoading } =
    api.location.getLocationByCoords.useQuery(
      {
        lat_deg: appliedCoordinates?.lat_deg ?? "",
        lon_deg: appliedCoordinates?.lon_deg ?? "",
        lat_dir: appliedCoordinates?.lat_dir ?? "",
        lon_dir: appliedCoordinates?.lon_dir ?? "",
        versionId: appliedFilter.versionId!,
      },
      {
        enabled:
          !!appliedFilter.versionId &&
          !!appliedCoordinates &&
          !!appliedCoordinates.lat_deg &&
          !!appliedCoordinates.lon_deg &&
          !!appliedCoordinates.lat_dir &&
          !!appliedCoordinates.lon_dir,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
    );

  useEffect(() => {
    if (locData) {
      setAppliedLocation(locData);
    }
  }, [locData, setAppliedLocation]);

  useEffect(() => {
    setLocationLoading(isLoading);
  }, [isLoading, setLocationLoading]);

  return (
    <Wrapper style={{ width: "25%", position: "relative" }}>
      {isLoading && (
        <div className="absolute left-0 top-0 z-20 flex size-full flex-col rounded-tl-3xl bg-blue-700/25">
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            className="m-auto"
          />
        </div>
      )}
      <div className="flex max-h-[calc(100vh-56px)] flex-col overflow-auto">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p className="text-2xl text-yellow-400">
              {locData?.namedLoc?.name_en ?? "Unknown Location"}
            </p>
            <p className="text-xl">
              {locData?.lat_dir} {locData?.lat_deg} {locData?.lon_dir}{" "}
              {locData?.lon_deg}
            </p>
          </div>
          <div className="gap-1">
            <div className="flex flex-row justify-between">
              <p className="text-blue-300">Difficulty Challenge</p>
              {locData?.difficulty}
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-blue-300">Average Altitude</p>{" "}
              {locData?.altitude} m
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-blue-300">Mean Temperature</p>
              {locData?.temperature}
              {"°C"}
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-blue-300">Topography</p> {locData?.topography}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <p className="text-2xl uppercase text-blue-300">THREATS</p>
            <p className="text-2xl uppercase text-blue-300">RESOURCES</p>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 items-center">
                <Rhombi value={locData?.dust_devils ?? 0} />
                <p>Dust Devils</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Rhombi value={locData?.dust_storms ?? 0} />
                <p>Dust Storms</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Rhombi value={locData?.concrete ?? 0} />
                <p>Meteors</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Rhombi value={locData?.water ?? 0} />
                <p>Cold Waves</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 items-center">
                <Rhombi value={locData?.metals ?? 0} />
                <p>Metals</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Rhombi value={locData?.rare_metals ?? 0} />
                <p>Rare Metals</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Rhombi value={locData?.concrete ?? 0} />
                <p>Concrete</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Rhombi value={locData?.water ?? 0} />
                <p>Water</p>
              </div>
            </div>
          </div>
          {!!locData?.map_name ? (
            <Image
              src={`/topology/${locData.map_name}.png`}
              className="bevel-clip-sm mt-2 rounded-tl-2xl"
              priority={true}
              alt="topology"
              width={480}
              height={270}
            />
          ) : (
            <Skeleton
              className="bevel-clip-sm mt-2 rounded-tl-2xl"
              style={{ width: "100%", height: "200px" }}
            />
          )}
          <p className="-mt-2 ml-auto text-xs text-blue-300">
            {locData?.map_name}
          </p>
          <p className="text-2xl uppercase text-blue-300">Breakthroughs</p>
          <div className="flex flex-col gap-4">
            {locData?.bts_loc?.map((btsloc, i) => (
              <div className="flex flex-col gap-0" key={btsloc.id}>
                <p>
                  {i + 1}. {btsloc.bt?.name_en}
                </p>
                <p className="text-xs italic">{btsloc.bt?.desc_en}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
