import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Location } from "~/server/api/routers/location";

export const MAP_NAMES = [
  { key: "BlankBig_01", label: "BlankBig_01" },
  { key: "BlankBig_02", label: "BlankBig_02" },
  { key: "BlankBig_03", label: "BlankBig_03" },
  { key: "BlankBig_04", label: "BlankBig_04" },
  { key: "BlankBigCanyonCMix_01", label: "BlankBigCanyonCMix_01" },
  { key: "BlankBigCanyonCMix_02", label: "BlankBigCanyonCMix_02" },
  { key: "BlankBigCanyonCMix_03", label: "BlankBigCanyonCMix_03" },
  { key: "BlankBigCanyonCMix_04", label: "BlankBigCanyonCMix_04" },
  { key: "BlankBigCanyonCMix_05", label: "BlankBigCanyonCMix_05" },
  { key: "BlankBigCanyonCMix_06", label: "BlankBigCanyonCMix_06" },
  { key: "BlankBigCanyonCMix_07", label: "BlankBigCanyonCMix_07" },
  { key: "BlankBigCanyonCMix_08", label: "BlankBigCanyonCMix_08" },
  { key: "BlankBigCanyonCMix_09", label: "BlankBigCanyonCMix_09" },
  { key: "BlankBigCliffsCMix_01", label: "BlankBigCliffsCMix_01" },
  { key: "BlankBigCliffsCMix_02", label: "BlankBigCliffsCMix_02" },
  { key: "BlankBigCrater_01", label: "BlankBigCrater_01" },
  { key: "BlankBigCratersCMix_01", label: "BlankBigCratersCMix_01" },
  { key: "BlankBigCratersCMix_02", label: "BlankBigCratersCMix_02" },
  { key: "BlankBigHeartCMix_03", label: "BlankBigHeartCMix_03" },
  { key: "BlankBigTerraceCMix_01", label: "BlankBigTerraceCMix_01" },
  { key: "BlankBigTerraceCMix_02", label: "BlankBigTerraceCMix_02" },
  { key: "BlankBigTerraceCMix_03", label: "BlankBigTerraceCMix_03" },
  { key: "BlankBigTerraceCMix_04", label: "BlankBigTerraceCMix_04" },
  { key: "BlankBigTerraceCMix_05", label: "BlankBigTerraceCMix_05" },
  { key: "BlankBigTerraceCMix_06", label: "BlankBigTerraceCMix_06" },
  { key: "BlankBigTerraceCMix_07", label: "BlankBigTerraceCMix_07" },
  { key: "BlankBigTerraceCMix_08", label: "BlankBigTerraceCMix_08" },
  { key: "BlankBigTerraceCMix_09", label: "BlankBigTerraceCMix_09" },
  { key: "BlankBigTerraceCMix_10", label: "BlankBigTerraceCMix_10" },
  { key: "BlankBigTerraceCMix_11", label: "BlankBigTerraceCMix_11" },
  { key: "BlankBigTerraceCMix_12", label: "BlankBigTerraceCMix_12" },
  { key: "BlankBigTerraceCMix_13", label: "BlankBigTerraceCMix_13" },
  { key: "BlankBigTerraceCMix_14", label: "BlankBigTerraceCMix_14" },
  { key: "BlankBigTerraceCMix_15", label: "BlankBigTerraceCMix_15" },
  { key: "BlankBigTerraceCMix_16", label: "BlankBigTerraceCMix_16" },
  { key: "BlankBigTerraceCMix_17", label: "BlankBigTerraceCMix_17" },
  { key: "BlankBigTerraceCMix_18", label: "BlankBigTerraceCMix_18" },
  { key: "BlankBigTerraceCMix_19", label: "BlankBigTerraceCMix_19" },
  { key: "BlankBigTerraceCMix_20", label: "BlankBigTerraceCMix_20" },
  { key: "BlankTerraceBig_05", label: "BlankTerraceBig_05" },
];

export const TOPOGRAPHY_NAMES = [
  { key: "Relatively Flat", label: "Relatively Flat" },
  { key: "Steep", label: "Steep" },
  { key: "Rough", label: "Rough" },
  { key: "Mountainous", label: "Mountainous" },
];

export type Coordinates = {
  lat_dir: string;
  lat_deg: string;
  lon_dir: string;
  lon_deg: string;
};

export type Filter = {
  coordinates: string;
  versionId: number | null;
  namedLocationIds: number[];
  mapNames: string[];
  topographyNames: string[];
  breakthroughIds: number[];
  minAltitude: number;
  maxAltitude: number;
  minConcrete: number;
  maxConcrete: number;
  minWater: number;
  maxWater: number;
  minMetals: number;
  maxMetals: number;
  minRareMetals: number;
  maxRareMetals: number;
  minTemperature: number;
  maxTemperature: number;
  minMeteors: number;
  maxMeteors: number;
  minDustDevils: number;
  maxDustDevils: number;
  minDustStorms: number;
  maxDustStorms: number;
  minColdWaves: number;
  maxColdWaves: number;
  minDifficulty: number;
  maxDifficulty: number;
};

interface State {
  filter: Filter;
  appliedFilter: Filter;
  isLocationLoading: boolean;
  appliedLocation: Location | null;
  appliedCoordinates: Coordinates | null;
}

interface Actions {
  setAppliedCoordinates: (coord: Coordinates) => void;
  setAppliedLocation: (location: Location) => void;
  setLocationLoading: (loading: boolean) => void;
  setFilter: (filter: Filter) => void;
  applyFilter: () => void;
  clearFilter: () => void;
  setCoordinates: (coordinates: string) => void;
  setVersionId: (versionId: number | null) => void;
  setNamedLocationIds: (namedLocationIds: number[]) => void;
  setMapNames: (mapNames: string[]) => void;
  setTopographyNames: (topographyNames: string[]) => void;
  setBreakthroughIds: (breakthroughIds: number[]) => void;
  setMinAltitude: (minAltitude: number) => void;
  setMaxAltitude: (maxAltitude: number) => void;
  setMinConcrete: (minConcrete: number) => void;
  setMaxConcrete: (maxConcrete: number) => void;
  setMinWater: (minWater: number) => void;
  setMaxWater: (maxWater: number) => void;
  setMinMetals: (minMetals: number) => void;
  setMaxMetals: (maxMetals: number) => void;
  setMinRareMetals: (minRareMetals: number) => void;
  setMaxRareMetals: (maxRareMetals: number) => void;
  setMinTemperature: (minTemperature: number) => void;
  setMaxTemperature: (maxTemperature: number) => void;
  setMinMeteors: (minMeteors: number) => void;
  setMaxMeteors: (maxMeteors: number) => void;
  setMinDustDevils: (minDustDevils: number) => void;
  setMaxDustDevils: (maxDustDevils: number) => void;
  setMinDustStorms: (minDustStorms: number) => void;
  setMaxDustStorms: (maxDustStorms: number) => void;
  setMinColdWaves: (minColdWaves: number) => void;
  setMaxColdWaves: (maxColdWaves: number) => void;
  setMinDifficulty: (minDifficulty: number) => void;
  setMaxDifficulty: (maxDifficulty: number) => void;
}

export const initialFilter = {
  coordinates: "",
  versionId: null,
  namedLocationIds: [],
  mapNames: [],
  topographyNames: [],
  breakthroughIds: [],
  minAltitude: -8500,
  maxAltitude: 21500,
  minConcrete: 1,
  maxConcrete: 4,
  minWater: 1,
  maxWater: 4,
  minMetals: 1,
  maxMetals: 4,
  minRareMetals: 1,
  maxRareMetals: 4,
  minTemperature: -100,
  maxTemperature: 0,
  minMeteors: 1,
  maxMeteors: 4,
  minDustDevils: 1,
  maxDustDevils: 4,
  minDustStorms: 1,
  maxDustStorms: 4,
  minColdWaves: 1,
  maxColdWaves: 4,
  minDifficulty: 1,
  maxDifficulty: 240,
};

const initialCoordinates = {
  lat_dir: "N",
  lat_deg: "18",
  lon_dir: "W",
  lon_deg: "134",
};

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      filter: initialFilter,
      appliedFilter: initialFilter,
      appliedLocation: null,
      appliedCoordinates: initialCoordinates,
      isLocationLoading: true,
      setLocationLoading: (loading: boolean) => {
        set({ isLocationLoading: loading });
      },
      setAppliedLocation: (location: Location) => {
        if (!!location) set({ appliedLocation: location });
      },
      setAppliedCoordinates: (coordinates: Coordinates) => {
        set({ appliedCoordinates: coordinates });
      },
      clearFilter: () => {
        set({
          filter: initialFilter,
          appliedFilter: initialFilter,
          appliedCoordinates: initialCoordinates,
          isLocationLoading: true,
        });
      },
      applyFilter: () => {
        set({ appliedFilter: get().filter });
      },
      setFilter: (filter: Filter) => {
        set({ filter });
      },
      setCoordinates: (coordinates: string) => {
        set({ filter: { ...get().filter, coordinates } });
      },
      setVersionId: (versionId: number | null) => {
        set({ filter: { ...get().filter, versionId } });
      },
      setNamedLocationIds: (namedLocationIds: number[]) => {
        set({ filter: { ...get().filter, namedLocationIds } });
      },
      setMapNames: (mapNames: string[]) => {
        set({ filter: { ...get().filter, mapNames } });
      },
      setTopographyNames: (topographyNames: string[]) => {
        set({ filter: { ...get().filter, topographyNames } });
      },
      setBreakthroughIds: (breakthroughIds: number[]) => {
        set({ filter: { ...get().filter, breakthroughIds } });
      },
      setMinAltitude: (minAltitude: number) => {
        set({ filter: { ...get().filter, minAltitude } });
      },
      setMaxAltitude: (maxAltitude: number) => {
        set({ filter: { ...get().filter, maxAltitude } });
      },
      setMinConcrete: (minConcrete: number) => {
        set({ filter: { ...get().filter, minConcrete } });
      },
      setMaxConcrete: (maxConcrete: number) => {
        set({ filter: { ...get().filter, maxConcrete } });
      },
      setMinWater: (minWater: number) => {
        set({ filter: { ...get().filter, minWater } });
      },
      setMaxWater: (maxWater: number) => {
        set({ filter: { ...get().filter, maxWater } });
      },
      setMinMetals: (minMetals: number) => {
        set({ filter: { ...get().filter, minMetals } });
      },
      setMaxMetals: (maxMetals: number) => {
        set({ filter: { ...get().filter, maxMetals } });
      },
      setMinRareMetals: (minRareMetals: number) => {
        set({ filter: { ...get().filter, minRareMetals } });
      },
      setMaxRareMetals: (maxRareMetals: number) => {
        set({ filter: { ...get().filter, maxRareMetals } });
      },
      setMinTemperature: (minTemperature: number) => {
        set({ filter: { ...get().filter, minTemperature } });
      },
      setMaxTemperature: (maxTemperature: number) => {
        set({ filter: { ...get().filter, maxTemperature } });
      },
      setMinMeteors: (minMeteors: number) => {
        set({ filter: { ...get().filter, minMeteors } });
      },
      setMaxMeteors: (maxMeteors: number) => {
        set({ filter: { ...get().filter, maxMeteors } });
      },
      setMinDustDevils: (minDustDevils: number) => {
        set({ filter: { ...get().filter, minDustDevils } });
      },
      setMaxDustDevils: (maxDustDevils: number) => {
        set({ filter: { ...get().filter, maxDustDevils } });
      },
      setMinDustStorms: (minDustStorms: number) => {
        set({ filter: { ...get().filter, minDustStorms } });
      },
      setMaxDustStorms: (maxDustStorms: number) => {
        set({ filter: { ...get().filter, maxDustStorms } });
      },
      setMinColdWaves: (minColdWaves: number) => {
        set({ filter: { ...get().filter, minColdWaves } });
      },
      setMaxColdWaves: (maxColdWaves: number) => {
        set({ filter: { ...get().filter, maxColdWaves } });
      },
      setMinDifficulty: (minDifficulty: number) => {
        set({ filter: { ...get().filter, minDifficulty } });
      },
      setMaxDifficulty: (maxDifficulty: number) => {
        set({ filter: { ...get().filter, maxDifficulty } });
      },
    }),
    {
      name: "locationStore",
    },
  ),
);
