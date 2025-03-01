"use client";
import Wrapper from "./Wrapper";
import { useStore } from "~/store";
import Image from "next/image";
import IconLoading from "./IconLoading";

const Rhombi = ({ value }: { value: number }) => {
  return (
    <div className="flex w-min flex-row gap-0.5">
      {Array.from({ length: value }).map((_, i) => (
        <div className="h-4 w-4 -skew-x-12 rounded-sm border-1 border-indigo-200 bg-indigo-400/75" />
      ))}
      {Array.from({ length: 4 - value }).map((_, i) => (
        <div className="h-4 w-4 -skew-x-12 rounded-sm border-1 border-indigo-200 bg-indigo-950" />
      ))}
    </div>
  );
};

export default function Menu() {
  const { locData, locationLoading } = useStore();
  return (
    <Wrapper>
      <div className="relative flex flex-col">
        {locationLoading && (
          <div className="absolute -left-8 -top-8 z-20 flex h-full w-[400px] flex-col items-center rounded-tl-3xl bg-violet-700/25 pt-96">
            <IconLoading className="animate-spin" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-4xl">
            {locData?.lat_dir} {locData?.lat_deg} {locData?.lon_dir}{" "}
            {locData?.lon_deg}
          </p>
          <div className="gap-1">
            <p className="-mt-4 text-2xl text-yellow-400">
              {locData?.namedLoc?.name_en ?? "Unknown Location"}
            </p>
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
          <Image
            src={`/topology/${locData?.map_name}.png`}
            className="bevel-clip-sm mt-2 rounded-tl-2xl"
            alt="topology"
            width={480}
            height={270}
          />
          <p className="-mt-2 ml-auto text-xs text-blue-300">
            {locData?.map_name}
          </p>
          <p className="text-2xl uppercase text-blue-300">Breakthroughs</p>
          <div className="flex flex-col gap-4">
            {locData?.bts_loc
              ?.filter((btsloc) => btsloc.ver_id === 1)
              .map((btsloc, i) => (
                <div className="flex flex-col gap-0" key={btsloc.bt?.id}>
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
