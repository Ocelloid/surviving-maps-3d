"use client";
import Wrapper from "./Wrapper";
import { useStore } from "~/store";
import Image from "next/image";

export default function Menu() {
  const { locData, locationLoading } = useStore();
  return (
    <Wrapper>
      {locationLoading ? (
        <p>Loading...</p>
      ) : (
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
          <p>Difficulty Challenge: {locData?.difficulty}</p>
          <p>Temperature: {locData?.temperature}</p>
          <p>Map Name: {locData?.map_name}</p>
          <p>Named Location: {locData?.namedLoc?.name_en}</p>
          <p>
            Breakthroughs:{" "}
            {locData?.bts_loc?.filter((btsloc) => btsloc.ver_id === 1).length}
          </p>
          <div className="flex flex-col gap-4 py-4">
            {locData?.bts_loc
              ?.filter((btsloc) => btsloc.ver_id === 1)
              .map((btsloc) => (
                <div className="flex flex-col gap-2" key={btsloc.bt?.id}>
                  <p>{btsloc.bt?.name_en}</p>
                  <p>{btsloc.bt?.desc_en}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
}
