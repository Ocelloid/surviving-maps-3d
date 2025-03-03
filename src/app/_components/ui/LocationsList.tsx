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

const LocationRow = ({
  location,
  handleChoose,
}: {
  location: Location;
  handleChoose?: (location: Location) => void;
}) => {
  return (
    <div
      onClick={() => handleChoose?.(location)}
      className="bevel-clip-xs flex cursor-pointer flex-col rounded-tl-xl bg-blue-700/25 px-2 py-1 shadow-md transition hover:shadow-xl hover:brightness-125"
    >
      <div className="flex flex-row gap-1">
        <p className="min-w-20 text-xl">
          {location?.lat_dir} {location?.lat_deg} {location?.lon_dir}{" "}
          {location?.lon_deg}
        </p>
        <p className="text-2xl text-yellow-400">
          {location.namedLoc?.name_en ?? "Unknown Location"}
        </p>
      </div>
      <div className="flex flex-row items-center gap-4 text-xs">
        <div className="flex-row gap-1">
          <Rhombi value={location.concrete} />
          Concrete
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.water} />
          Water
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.metals} />
          Metals
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.rare_metals} />
          Rare Metals
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.meteors} />
          <p>Meteors</p>
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.dust_devils} />
          Dust Devils
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.dust_storms} />
          Dust Storms
        </div>
        <div className="flex-row gap-1">
          <Rhombi value={location.cold_waves} />
          Cold Waves
        </div>
      </div>
    </div>
  );
};

export default function LocationsList() {
  const { appliedFilter, setAppliedCoordinates } = useStore();
  const [currentPage, setCurrentPage] = useState(1);

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
    <Wrapper style={{ minWidth: "min-content", width: "60%" }}>
      <Accordion isCompact={true} className="flex flex-col gap-2">
        <AccordionItem
          title="Locations List"
          classNames={{
            base: "-mx-2",
            trigger: "p-0",
            heading: "z-50 w-full top-0",
            title: "text-2xl uppercase text-blue-300",
            content: " overflow-hidden flex-col flex gap-2",
          }}
        >
          <div
            style={{
              maxHeight:
                (locationsListData?.total[0]?.count ?? 0) / 10 > 1
                  ? "calc(100vh - 140px)"
                  : "calc(100vh - 96px)",
            }}
            className={`flex h-screen flex-grow flex-col gap-1 overflow-x-hidden overflow-y-scroll`}
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
        </AccordionItem>
      </Accordion>
    </Wrapper>
  );
}
