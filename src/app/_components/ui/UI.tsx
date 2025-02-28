import Filter from "./Filter";
import Menu from "./Menu";

export default function UI() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col-reverse justify-between md:flex-row">
      <Filter />
      <Menu />
    </div>
  );
}
