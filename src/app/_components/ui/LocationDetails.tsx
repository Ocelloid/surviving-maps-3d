"use client";
import Wrapper from "./Wrapper";
import { useStore } from "~/store";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import {
  CircularProgress,
  Skeleton,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { titleLabels, detailsLabels, topographyNames } from "~/locale";

export const Rhombi = ({ value }: { value: number | null }) => {
  return (
    <div className="flex w-min flex-row gap-0.5 pl-1">
      {Array.from({ length: value ?? 0 }).map((_, i) => (
        <div
          key={"filled_" + i}
          className="size-3 -skew-x-12 rounded-sm border-1 border-indigo-200 bg-indigo-400/75"
        />
      ))}
      {Array.from({ length: 4 - (value ?? 0) }).map((_, i) => (
        <div
          key={"unfilled_" + i}
          className="size-3 -skew-x-12 rounded-sm border-1 border-indigo-200 bg-indigo-950"
        />
      ))}
    </div>
  );
};

export default function LocationDetails() {
  const {
    language,
    appliedFilter,
    appliedCoordinates,
    setLocationLoading,
    setAppliedLocation,
  } = useStore();
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

  const TITLE = titleLabels.find((l) => l.language === language)!.labels
    .details;
  const DETAILS_LABELS = detailsLabels.find(
    (l) => l.language === language,
  )!.labels;
  const TOPOGRAPHY_NAMES = topographyNames.find(
    (l) => l.language === language,
  )!.kv;

  const NAME =
    language === "en"
      ? locData?.namedLoc?.name_en
      : language === "br"
        ? locData?.namedLoc?.name_br
        : language === "fr"
          ? locData?.namedLoc?.name_fr
          : language === "ge"
            ? locData?.namedLoc?.name_ge
            : language === "po"
              ? locData?.namedLoc?.name_po
              : language === "ru"
                ? locData?.namedLoc?.name_ru
                : language === "sc"
                  ? locData?.namedLoc?.name_sc
                  : language === "sp"
                    ? locData?.namedLoc?.name_sp
                    : null;

  const filteredBreakthroguhs =
    locData?.bts_loc
      ?.map((btsloc, i, arr) => {
        return arr[i - 1]?.bt_id === btsloc.bt_id ||
          arr[i + 1]?.bt_id === btsloc.bt_id
          ? null
          : btsloc;
      })
      .filter((b) => !!b) ?? [];

  return (
    <Wrapper className="relative lg:w-1/4">
      <Accordion
        isCompact={true}
        className="flex flex-col gap-2"
        defaultExpandedKeys={["details"]}
      >
        <AccordionItem
          key="details"
          title={TITLE}
          classNames={{
            base: "-mx-2 ",
            trigger: "p-0",
            heading: "z-50 w-full top-0",
            title: "text-2xl uppercase text-blue-300",
            content: "overflow-hidden flex-col flex gap-2 ",
          }}
        >
          {isLoading && (
            <div className="absolute left-0 top-0 z-20 flex size-full flex-col rounded-3xl bg-blue-700/25">
              <CircularProgress
                aria-label="Loading..."
                className="m-auto"
                classNames={{
                  base: "pb-36",
                  svg: "w-24 h-24",
                }}
              />
            </div>
          )}
          <div className="flex flex-col overflow-auto md:h-dvh md:max-h-[calc(100vh-90px)]">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-between xl:flex-row xl:items-center">
                <p className="text-2xl text-yellow-400">
                  {NAME ?? DETAILS_LABELS.unknownLocation}
                </p>
                <p className="text-xl">
                  {locData?.lat_dir} {locData?.lat_deg} {locData?.lon_dir}{" "}
                  {locData?.lon_deg}
                </p>
              </div>
              <div className="gap-1">
                <div className="flex flex-row justify-between">
                  <p className="text-blue-300">{DETAILS_LABELS.difficulty}</p>
                  {locData?.difficulty}
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-blue-300">{DETAILS_LABELS.altitude}</p>{" "}
                  {locData?.altitude} m
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-blue-300">{DETAILS_LABELS.temperature}</p>{" "}
                  {locData?.temperature}
                  {"°C"}
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-blue-300">{DETAILS_LABELS.topography}</p>{" "}
                  {
                    TOPOGRAPHY_NAMES.find((t) => t.key === locData?.topography)
                      ?.label
                  }
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs xl:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="-mb-2 text-2xl uppercase text-blue-300">
                    {DETAILS_LABELS.threats}
                  </p>
                  <div className="grid grid-cols-2 items-center">
                    <Rhombi value={locData?.meteors ?? 0} />
                    <p>{DETAILS_LABELS.threatList.meteors}</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <Rhombi value={locData?.dust_devils ?? 0} />
                    <p>{DETAILS_LABELS.threatList.dustDevils}</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <Rhombi value={locData?.dust_storms ?? 0} />
                    <p>{DETAILS_LABELS.threatList.dustStorms}</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <Rhombi value={locData?.cold_waves ?? 0} />
                    <p>{DETAILS_LABELS.threatList.coldWaves}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="-mb-2 text-2xl uppercase text-blue-300">
                    {DETAILS_LABELS.resources}
                  </p>
                  <div className="grid grid-cols-2 items-center">
                    <Rhombi value={locData?.metals ?? 0} />
                    <p>{DETAILS_LABELS.resourceList.metals}</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <Rhombi value={locData?.rare_metals ?? 0} />
                    <p>{DETAILS_LABELS.resourceList.rareMetals}</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <Rhombi value={locData?.concrete ?? 0} />
                    <p>{DETAILS_LABELS.resourceList.concrete}</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <Rhombi value={locData?.water ?? 0} />
                    <p>{DETAILS_LABELS.resourceList.water}</p>
                  </div>
                </div>
              </div>
              {!!locData?.map_name ? (
                <Image
                  src={`/topology/${locData.map_name}.png`}
                  className="bevel-clip-2xl mt-2 rounded-tl-2xl"
                  priority={true}
                  alt="topology"
                  width={480}
                  height={270}
                />
              ) : (
                <Skeleton
                  className="bevel-clip-2xl mt-2 rounded-tl-2xl"
                  style={{ width: "100%", height: "200px" }}
                />
              )}
              <p className="-mt-2 ml-auto text-xs text-blue-300">
                {locData?.map_name}
              </p>
              <p className="text-2xl uppercase text-blue-300">
                {DETAILS_LABELS.breakthroughs}
              </p>
              {/* <div className="-mt-2 flex flex-col gap-0 text-justify text-xs italic text-blue-300">
                <p>
                  Only shows first 13 breakthroughs: anything higher than that
                  isn&apos;t guaranteed (unless using paradox sponsor which
                  gives an extra 2-4).
                </p>
                <p>
                  1-4 are planetary anomalies, the rest are surface anomalies.
                  You can turn them off by choosing &ldquo;no PA&rdquo; in the
                  version.
                </p>
                <p>
                  If you have B&B then you need to use ChoGGi&apos;s Fix Bugs
                  mod on new games or ignore them.
                </p>
              </div> */}
              <Accordion
                isCompact={true}
                className="flex flex-col gap-2"
                defaultExpandedKeys={
                  filteredBreakthroguhs[0]?.id.toString() ?? ""
                }
              >
                {filteredBreakthroguhs.map((btsloc, i) => (
                  <AccordionItem
                    key={btsloc.id}
                    title={`${i + 1}. ${
                      (language === "en"
                        ? btsloc.bt?.name_en
                        : language === "br"
                          ? btsloc.bt?.name_br
                          : language === "fr"
                            ? btsloc.bt?.name_fr
                            : language === "ge"
                              ? btsloc.bt?.name_ge
                              : language === "po"
                                ? btsloc.bt?.name_po
                                : language === "ru"
                                  ? btsloc.bt?.name_ru
                                  : language === "sc"
                                    ? btsloc.bt?.name_sc
                                    : language === "sp"
                                      ? btsloc.bt?.name_sp
                                      : null) ?? "TODO translation"
                    }`}
                    classNames={{
                      base: "-mx-2",
                      title: "text-blue-300",
                      trigger: "p-0",
                      content: "text-xs italic",
                    }}
                  >
                    {(language === "en"
                      ? btsloc.bt?.desc_en
                      : language === "br"
                        ? btsloc.bt?.desc_br
                        : language === "fr"
                          ? btsloc.bt?.desc_fr
                          : language === "ge"
                            ? btsloc.bt?.desc_ge
                            : language === "po"
                              ? btsloc.bt?.desc_po
                              : language === "ru"
                                ? btsloc.bt?.desc_ru
                                : language === "sc"
                                  ? btsloc.bt?.desc_sc
                                  : language === "sp"
                                    ? btsloc.bt?.desc_sp
                                    : null) ?? "No description"}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </Wrapper>
  );
}
