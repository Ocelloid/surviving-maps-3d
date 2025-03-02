import LocationsList from "./LocationsList";
import Filter from "./Filter";
import LocationDetails from "./LocationDetails";

export default function UI() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col-reverse justify-between gap-3 p-3 md:flex-row">
      <Filter />
      <LocationsList />
      <LocationDetails />
    </div>
  );
}
