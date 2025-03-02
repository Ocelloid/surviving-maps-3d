"use client";
import Wrapper from "./Wrapper";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { useStore, initialState, MAP_NAMES, TOPOGRAPHY_NAMES } from "~/store";
import {
  Button,
  Slider,
  Input,
  Select,
  SelectItem,
  SelectSection,
  Skeleton,
} from "@heroui/react";

function FilterSlider({
  value,
  minValue,
  maxValue,
  onChange,
  label,
  step,
}: {
  value: [number, number];
  minValue: number;
  maxValue: number;
  onChange: (value: number | number[]) => void;
  label: string;
  step?: number;
}) {
  return (
    <Slider
      size="sm"
      value={value}
      onChange={onChange}
      defaultValue={[minValue, maxValue]}
      label={label}
      minValue={minValue}
      maxValue={maxValue}
      step={step ?? 1}
    />
  );
}

type FilterSelection = {
  key: number;
  label: string;
};

export default function Filter() {
  const {
    filter,
    clearFilter,
    setCoordinates, // input
    setVersionId, // select
    setNamedLocationIds, // multiselect
    setMapNames, // multiselect
    setTopographyNames, // multiselect
    setBreakthroughIds, // multiselect
    setMinAltitude, // slider
    setMaxAltitude, // slider
    setMinConcrete, // slider
    setMaxConcrete, // slider
    setMinWater, // slider
    setMaxWater, // slider
    setMinMetals, // slider
    setMaxMetals, // slider
    setMinRareMetals, // slider
    setMaxRareMetals, // slider
    setMinTemperature, // slider
    setMaxTemperature, // slider
    setMinMeteors, // slider
    setMaxMeteors, // slider
    setMinDustDevils, // slider
    setMaxDustDevils, // slider
    setMinDustStorms, // slider
    setMaxDustStorms, // slider
    setMinColdWaves, // slider
    setMaxColdWaves, // slider
    setMinDifficulty, // slider
    setMaxDifficulty, // slider
  } = useStore();
  const [namedLocations, setNamedLocations] = useState<FilterSelection[]>([]);
  const [breakthroughs, setBreakthroughs] = useState<FilterSelection[]>([]);
  const [versions, setVersions] = useState<FilterSelection[]>([]);

  const { data: filterData, isLoading: isFilterDataLoading } =
    api.location.getFilterData.useQuery(undefined, {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    });

  useEffect(() => {
    if (filterData) {
      clearFilter();
      setVersions(
        filterData.versions.map((v) => ({
          key: v.id,
          label: v.name ?? "",
        })),
      );
      setBreakthroughs(
        filterData.breakthroughs.map((b) => ({
          key: b.id,
          label: b.name_en ?? "",
        })),
      );
      setNamedLocations(
        filterData.namedLocations.map((nl) => ({
          key: nl.id,
          label: nl.name_en ?? "",
        })),
      );
      setVersionId(filterData.versions[0]?.id ?? null);
      setNamedLocationIds(filterData.namedLocations.map((nl) => nl.id));
      setBreakthroughIds(filterData.breakthroughs.map((b) => b.id));
    }
  }, [
    filterData,
    clearFilter,
    setVersions,
    setBreakthroughs,
    setNamedLocations,
    setVersionId,
    setNamedLocationIds,
    setBreakthroughIds,
  ]);

  return (
    <Wrapper style={{ width: "15%" }}>
      <div className="flex flex-col gap-2">
        <p className="text-2xl uppercase text-blue-300">Filter</p>
        <Input
          value={filter.coordinates}
          onValueChange={setCoordinates}
          size="sm"
          label="Coordinates"
          placeholder="N 18 W 134"
        />
        {!isFilterDataLoading ? (
          <>
            <Select
              size="sm"
              label="Version"
              selectedKeys={[Number(filter.versionId)]}
              onSelectionChange={(keys) =>
                [...keys].includes("")
                  ? setVersionId(Number(versions[0]!.key))
                  : setVersionId([...keys].map(Number)[0]!)
              }
            >
              <SelectItem key={""}>All</SelectItem>
              <SelectSection title="Named Locations list" items={versions}>
                {(versionName) => <SelectItem>{versionName.label}</SelectItem>}
              </SelectSection>
            </Select>
            <Select
              size="sm"
              label="Named Location"
              selectionMode="multiple"
              selectedKeys={filter.namedLocationIds}
              onSelectionChange={(keys) =>
                [...keys].includes("")
                  ? setNamedLocationIds(breakthroughs.map((t) => Number(t.key)))
                  : setNamedLocationIds([...keys].map(Number))
              }
            >
              <SelectItem key={""}>All</SelectItem>
              <SelectSection
                title="Named Locations list"
                items={namedLocations}
              >
                {(namedLocation) => (
                  <SelectItem>{namedLocation.label}</SelectItem>
                )}
              </SelectSection>
            </Select>
            <Select
              size="sm"
              label="Map"
              selectionMode="multiple"
              selectedKeys={filter.mapNames}
              onSelectionChange={(keys) =>
                [...keys].includes("")
                  ? setMapNames(MAP_NAMES.map((t) => t.key))
                  : setMapNames([...keys].map(String))
              }
            >
              <SelectItem key={""}>All</SelectItem>
              <SelectSection title="Map names" items={MAP_NAMES}>
                {(mapName) => <SelectItem>{mapName.label}</SelectItem>}
              </SelectSection>
            </Select>
            <Select
              size="sm"
              label="Topography"
              selectionMode="multiple"
              selectedKeys={filter.topographyNames}
              onSelectionChange={(keys) =>
                [...keys].includes("")
                  ? setTopographyNames(TOPOGRAPHY_NAMES.map((t) => t.key))
                  : setTopographyNames([...keys].map(String))
              }
            >
              <SelectItem key={""}>All</SelectItem>
              <SelectSection title="Topography names" items={TOPOGRAPHY_NAMES}>
                {(topographyName) => (
                  <SelectItem>{topographyName.label}</SelectItem>
                )}
              </SelectSection>
            </Select>
            <Select
              size="sm"
              label="Breakthrough"
              selectionMode="multiple"
              selectedKeys={filter.breakthroughIds}
              onSelectionChange={(keys) =>
                [...keys].includes("")
                  ? setBreakthroughIds(breakthroughs.map((t) => Number(t.key)))
                  : setBreakthroughIds([...keys].map(Number))
              }
            >
              <SelectItem key={""}>All</SelectItem>
              <SelectSection title="Breakthrough list" items={breakthroughs}>
                {(breakthroughName) => (
                  <SelectItem>{breakthroughName.label}</SelectItem>
                )}
              </SelectSection>
            </Select>
          </>
        ) : (
          <>
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </>
        )}
        <FilterSlider
          label="Altitude"
          value={[filter.minAltitude, filter.maxAltitude]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinAltitude(numbers[0]!);
            setMaxAltitude(numbers[1]!);
          }}
          minValue={initialState.filter.minAltitude}
          maxValue={initialState.filter.maxAltitude}
          step={50}
        />
        <FilterSlider
          label="Concrete"
          value={[filter.minConcrete, filter.maxConcrete]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinConcrete(numbers[0]!);
            setMaxConcrete(numbers[1]!);
          }}
          minValue={initialState.filter.minConcrete}
          maxValue={initialState.filter.maxConcrete}
        />
        <FilterSlider
          label="Water"
          value={[filter.minWater, filter.maxWater]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinWater(numbers[0]!);
            setMaxWater(numbers[1]!);
          }}
          minValue={initialState.filter.minWater}
          maxValue={initialState.filter.maxWater}
        />
        <FilterSlider
          label="Metals"
          value={[filter.minMetals, filter.maxMetals]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinMetals(numbers[0]!);
            setMaxMetals(numbers[1]!);
          }}
          minValue={initialState.filter.minMetals}
          maxValue={initialState.filter.maxMetals}
        />
        <FilterSlider
          label="Rare Metals"
          value={[filter.minRareMetals, filter.maxRareMetals]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinRareMetals(numbers[0]!);
            setMaxRareMetals(numbers[1]!);
          }}
          minValue={initialState.filter.minRareMetals}
          maxValue={initialState.filter.maxRareMetals}
        />
        <FilterSlider
          label="Temperature"
          value={[filter.minTemperature, filter.maxTemperature]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinTemperature(numbers[0]!);
            setMaxTemperature(numbers[1]!);
          }}
          minValue={initialState.filter.minTemperature}
          maxValue={initialState.filter.maxTemperature}
        />
        <FilterSlider
          label="Meteors"
          value={[filter.minMeteors, filter.maxMeteors]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinMeteors(numbers[0]!);
            setMaxMeteors(numbers[1]!);
          }}
          minValue={initialState.filter.minMeteors}
          maxValue={initialState.filter.maxMeteors}
        />
        <FilterSlider
          label="Dust Devils"
          value={[filter.minDustDevils, filter.maxDustDevils]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinDustDevils(numbers[0]!);
            setMaxDustDevils(numbers[1]!);
          }}
          minValue={initialState.filter.minDustDevils}
          maxValue={initialState.filter.maxDustDevils}
        />
        <FilterSlider
          label="Dust Storms"
          value={[filter.minDustStorms, filter.maxDustStorms]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinDustStorms(numbers[0]!);
            setMaxDustStorms(numbers[1]!);
          }}
          minValue={initialState.filter.minDustStorms}
          maxValue={initialState.filter.maxDustStorms}
        />
        <FilterSlider
          label="Cold Waves"
          value={[filter.minColdWaves, filter.maxColdWaves]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinColdWaves(numbers[0]!);
            setMaxColdWaves(numbers[1]!);
          }}
          minValue={initialState.filter.minColdWaves}
          maxValue={initialState.filter.maxColdWaves}
        />
        <FilterSlider
          label="Difficulty Challenge"
          value={[filter.minDifficulty, filter.maxDifficulty]}
          onChange={(values) => {
            const numbers = values as number[];
            setMinDifficulty(numbers[0]!);
            setMaxDifficulty(numbers[1]!);
          }}
          minValue={initialState.filter.minDifficulty}
          maxValue={initialState.filter.maxDifficulty}
        />
      </div>
    </Wrapper>
  );
}
