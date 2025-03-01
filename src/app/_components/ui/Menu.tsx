"use client";
import Wrapper from "./Wrapper";
import { useStore } from "~/store";
import Image from "next/image";
import IconLoading from "./IconLoading";

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
          <div className="flex flex-row justify-between text-2xl">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/icons/metals.png"}
                alt="metals"
                width={32}
                height={32}
              />
              {locData?.metals}
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/icons/rare_metals.png"}
                alt="rare_metals"
                width={32}
                height={32}
              />
              {locData?.rare_metals}
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/icons/concrete.png"}
                alt="concrete"
                width={32}
                height={32}
              />
              {locData?.concrete}
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/icons/water.png"}
                alt="water"
                width={32}
                height={32}
              />
              {locData?.water}
            </div>
          </div>
          <div className="text-outline flex flex-row justify-between text-2xl">
            <div className="relative flex flex-row items-center gap-2">
              <Image
                src={"/icons/storm.png"}
                alt="storms"
                width={64}
                height={32}
              />
              <p className="absolute left-[25px] top-0">
                {locData?.dust_storms}
              </p>
            </div>
            <div className="relative flex flex-row items-center gap-2">
              <Image
                src={"/icons/devil.png"}
                alt="devils"
                width={64}
                height={32}
              />
              <p className="absolute left-[25px] top-0">
                {locData?.dust_devils}
              </p>
            </div>
            <div className="relative flex flex-row items-center gap-2">
              <Image
                src={"/icons/cold.png"}
                alt="cold"
                width={64}
                height={32}
              />
              <p className="absolute left-[25px] top-0">
                {locData?.cold_waves}
              </p>
            </div>
            <div className="relative flex flex-row items-center gap-2">
              <Image
                src={"/icons/meteors.png"}
                alt="meteors"
                width={64}
                height={32}
              />
              <p className="absolute left-[25px] top-0">{locData?.meteors}</p>
            </div>
          </div>
          <Image
            src={`/topology/${locData?.map_name}.png`}
            className="bevel-clip-sm rounded-tl-2xl"
            alt="topology"
            width={480}
            height={270}
          />
          <p className="-mt-2 ml-auto text-xs">Map Name: {locData?.map_name}</p>
          <p className="text-2xl text-yellow-400">
            {locData?.namedLoc?.name_en}
          </p>
          <p>Difficulty Challenge: {locData?.difficulty}</p>
          <p>Temperature: {locData?.temperature}</p>
          <p className="mt-2 text-2xl">Breakthroughs</p>
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
