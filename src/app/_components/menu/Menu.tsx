import Filter from "./Filter";

export default function Menu() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-between md:flex-row">
      <Filter />
    </div>
  );
}
