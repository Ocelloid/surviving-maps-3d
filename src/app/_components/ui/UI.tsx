"use client";
import { useState } from "react";
import LocationsList from "./LocationsList";
import Filter from "./Filter";
import LocationDetails from "./LocationDetails";

export default function UI() {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const openList = (flag: boolean) => setListOpen(flag);
  return (
    <div className="flex h-full min-h-dvh w-full flex-col gap-2 p-2 pb-12 lg:flex-row lg:justify-between lg:pb-0">
      <Filter openList={openList} />
      <LocationsList open={listOpen} openList={openList} />
      <LocationDetails />
    </div>
  );
}
