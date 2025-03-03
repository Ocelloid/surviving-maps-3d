import LocationsList from "./LocationsList";
import Filter from "./Filter";
import LocationDetails from "./LocationDetails";

export default function UI() {
  return (
    <div className="flex h-full min-h-dvh w-full flex-col gap-3 p-3 lg:flex-row lg:justify-between">
      <Filter />
      <LocationsList />
      <LocationDetails />
    </div>
  );
}
