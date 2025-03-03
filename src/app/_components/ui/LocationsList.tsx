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
  PaginationItem,
  PaginationCursor,
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
  const { appliedFilter, setLocation, setLocationLoading } = useStore();
  const [enabledChoice, setEnabledChoice] = useState(false);
  const [currentChoice, setCurrentChoice] = useState<Location | null>(null);

  const {
    data: locationsList,
    isLoading: isLocationsListLoading,
    refetch,
  } = api.location.getFilteredLocations.useQuery(
    {
      filter: appliedFilter,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );

  const { data: locationData, isFetched } =
    api.location.getLocationByCoords.useQuery(
      {
        lat_deg: currentChoice?.lat_deg ?? "",
        lon_deg: currentChoice?.lon_deg ?? "",
        lat_dir: currentChoice?.lat_dir ?? "",
        lon_dir: currentChoice?.lon_dir ?? "",
      },
      {
        enabled: currentChoice !== null && enabledChoice,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
    );

  useEffect(() => {
    if (appliedFilter) {
      void refetch();
    }
  }, [appliedFilter, refetch]);

  useEffect(() => {
    if (isFetched && locationData) {
      setLocation(locationData);
      setLocationLoading(false);
      setEnabledChoice(false);
      setCurrentChoice(null);
    }
  }, [isFetched, locationData, setLocation, setLocationLoading]);

  const handleRefetchLocation = (location: Location) => {
    setEnabledChoice(true);
    setLocationLoading(true);
    setCurrentChoice(location);
  };

  return (
    <Wrapper style={{ minWidth: "min-content", width: "60%" }}>
      TODO: pagination
      <Accordion isCompact={true} className="flex flex-col gap-2">
        <AccordionItem
          title="Locations List"
          classNames={{
            base: "-mx-2",
            trigger: "p-0",
            heading: "z-50 w-full top-0",
            title: "text-2xl uppercase text-blue-300",
            content: "h-fit overflow-scroll max-h-[calc(100vh-112px)]",
          }}
        >
          {isLocationsListLoading ? (
            <CircularProgress />
          ) : (
            <div className="flex flex-grow flex-col gap-1">
              {locationsList?.map((location) => (
                <LocationRow
                  key={location.id}
                  location={location}
                  handleChoose={handleRefetchLocation}
                />
              ))}
            </div>
          )}
        </AccordionItem>
      </Accordion>
    </Wrapper>
  );
}
