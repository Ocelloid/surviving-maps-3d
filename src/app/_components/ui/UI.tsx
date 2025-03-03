import LocationsList from "./LocationsList";
import Filter from "./Filter";
import LocationDetails from "./LocationDetails";

export default function UI() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col gap-3 p-3 md:flex-row md:justify-between">
      <Filter />
      <LocationsList />
      <LocationDetails />
    </div>
  );
}
