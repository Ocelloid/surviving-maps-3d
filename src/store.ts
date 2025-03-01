import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Location } from "~/server/api/routers/location";

interface State {
  locData: Location | null;
  locationLoading: boolean;
}

interface Actions {
  setLocation: (location: Location) => void;
  setLocationLoading: (loading: boolean) => void;
}

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      locData: null,
      locationLoading: true,
      setLocation: (location: Location) => {
        console.log(location);
        set({ locData: location });
      },
      setLocationLoading: (loading: boolean) => {
        set({ locationLoading: loading });
      },
    }),
    {
      name: "locationStore",
    },
  ),
);
