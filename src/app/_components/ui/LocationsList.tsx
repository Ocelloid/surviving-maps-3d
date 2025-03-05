"use client";
import { api } from "~/trpc/react";
import { useStore } from "~/store";
import type { Location } from "~/server/api/routers/location";
import { Rhombi } from "./LocationDetails";
import Wrapper from "./Wrapper";
import {
  Accordion,
  AccordionItem,
  Pagination,
  CircularProgress,
} from "@heroui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  titleLabels,
  resourcesLabels,
  threatsLabels,
  detailsLabels,
} from "~/locale";

const LocationRow = ({
  location,
  handleChoose,
}: {
  location: Location;
  handleChoose?: (location: Location) => void;
}) => {
  const { language } = useStore();
  const RESOURCES_LABELS = resourcesLabels.find(
    (l) => l.language === language,
  )!.labels;
  const THREATS_LABELS = threatsLabels.find(
    (l) => l.language === language,
  )!.labels;
  const DETAILS_LABELS = detailsLabels.find(
    (l) => l.language === language,
  )!.labels;
  const LOC_NAME =
    language === "en"
      ? location?.namedLoc?.name_en
      : language === "br"
        ? location?.namedLoc?.name_br
        : language === "fr"
          ? location?.namedLoc?.name_fr
          : language === "ge"
            ? location?.namedLoc?.name_ge
            : language === "po"
              ? location?.namedLoc?.name_po
              : language === "ru"
                ? location?.namedLoc?.name_ru
                : language === "sc"
                  ? location?.namedLoc?.name_sc
                  : language === "sp"
                    ? location?.namedLoc?.name_sp
                    : null;
  return (
    <div
      onClick={() => handleChoose?.(location)}
      className="bevel-clip-xl flex cursor-pointer flex-col rounded-tl-xl bg-blue-700/25 px-2 py-1 shadow-md transition hover:shadow-xl hover:brightness-125"
    >
      <div className="flex flex-row items-center gap-1">
        <p className="min-w-24 text-xl">
          {location?.lat_dir} {location?.lat_deg} {location?.lon_dir}{" "}
          {location?.lon_deg}
        </p>
        <p className="text-xl text-yellow-400">
          {LOC_NAME ?? DETAILS_LABELS.unknownLocation}
        </p>
      </div>
      <div className="grid grid-cols-4 flex-col text-xs xl:grid-cols-8">
        <div className="flex-row gap-1">
          <Rhombi value={location.concrete} />
          {RESOURCES_LABELS.concrete}
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.water} />
          {RESOURCES_LABELS.water}
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.metals} />
          {RESOURCES_LABELS.metals}
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.rare_metals} />
          {RESOURCES_LABELS.rareMetals}
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.meteors} />
          {THREATS_LABELS.meteors}
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.dust_devils} />
          {THREATS_LABELS.dustDevils}
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.dust_storms} />
          {THREATS_LABELS.dustStorms}
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.cold_waves} />
          {THREATS_LABELS.coldWaves}
        </div>
      </div>
    </div>
  );
};

export default function LocationsList() {
  const { appliedFilter, setAppliedCoordinates, language } = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  const TITLE = titleLabels.find((l) => l.language === language)!.labels.list;

  const {
    data: locationsListData,
    isLoading: isLocationsListLoading,
    refetch,
  } = api.location.getFilteredLocations.useQuery(
    {
      page: currentPage,
      filter: appliedFilter,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );

  useEffect(() => {
    if (appliedFilter) {
      setCurrentPage(1);
      void refetch();
    }
  }, [appliedFilter, refetch]);

  const handleApplyCoordinates = (location: Location) => {
    setAppliedCoordinates({
      lat_dir: location.lat_dir ?? "",
      lat_deg: location.lat_deg ?? "",
      lon_dir: location.lon_dir ?? "",
      lon_deg: location.lon_deg ?? "",
    });
  };

  return (
    <Wrapper className="lg:w-1/2">
      <Accordion isCompact={true} className="flex flex-col gap-2">
        <AccordionItem
          title={TITLE}
          classNames={{
            base: "-mx-2",
            trigger: "p-0",
            heading: "z-50 w-full top-0",
            title: "text-2xl uppercase text-blue-300",
            content: "overflow-hidden flex-col flex gap-2",
          }}
        >
          <div
            className={`flex flex-grow flex-col gap-1 overflow-x-hidden overflow-y-scroll md:h-dvh ${
              (locationsListData?.total[0]?.count ?? 0) / 10 > 1
                ? "md:max-h-[calc(100vh-134px)]"
                : "md:max-h-[calc(100vh-90px)]"
            }`}
          >
            {isLocationsListLoading ? (
              <CircularProgress
                aria-label="Loading..."
                className="m-auto"
                classNames={{
                  svg: "w-24 h-24",
                }}
              />
            ) : (
              <>
                {locationsListData?.locations.map((location) => (
                  <LocationRow
                    key={location.id}
                    location={location}
                    handleChoose={handleApplyCoordinates}
                  />
                ))}
              </>
            )}
          </div>
          {(locationsListData?.total[0]?.count ?? 0) / 10 > 1 && (
            <Pagination
              color="primary"
              page={currentPage}
              total={Number(
                ((locationsListData?.total[0]?.count ?? 0) / 10).toFixed(0),
              )}
              onChange={setCurrentPage}
            />
          )}
          <p className="ml-auto text-end text-xs text-blue-300 lg:-mt-6">
            data by{" "}
            <Link
              href="https://choggi.org"
              target="_blank"
              className="underline"
            >
              ChoGGi
            </Link>{" "}
            web dev by{" "}
            <Link
              href="https://ocelloid.com"
              target="_blank"
              className="underline"
            >
              Ocelloid
            </Link>
          </p>
        </AccordionItem>
      </Accordion>
    </Wrapper>
  );
}
