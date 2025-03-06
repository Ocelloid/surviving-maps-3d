"use client";
import Wrapper from "./Wrapper";
import { api } from "~/trpc/react";
import { useEffect, useState, useMemo } from "react";
import { useStore, initialFilter, MAP_NAMES } from "~/store";
import {
  Switch,
  Button,
  Slider,
  Input,
  Select,
  SelectItem,
  SelectSection,
  Skeleton,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import {
  languages,
  filterLabels,
  settingsLabels,
  titleLabels,
  topographyNames,
} from "~/locale";

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
      classNames={{
        label: "text-xs text-blue-300",
        value: "text-xs text-blue-300",
      }}
      showSteps={true}
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
    spin,
    filter,
    showCanvas,
    language,
    setLanguage,
    setSpin,
    setShowCanvas,
    applyFilter,
    clearFilter,
    setAppliedCoordinates,
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

  const isInvalid = useMemo(() => {
    if (filter.coordinates === "") return false;
    const coords = filter.coordinates.split(" ");
    if (coords.length !== 4) return true;
    const lat = Number(coords[1]);
    const lon = Number(coords[3]);
    if (lat > 70 || lat < -70 || lon > 180 || lon < -180) return true;
    return /^[NS] \d{1,3} [WE] \d{1,3}$/i.exec(filter.coordinates)
      ? false
      : true;
  }, [filter.coordinates]);

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
          label:
            language === "en"
              ? (b.name_en ?? "")
              : language === "br"
                ? (b.name_br ?? "")
                : language === "fr"
                  ? (b.name_fr ?? "")
                  : language === "ge"
                    ? (b.name_ge ?? "")
                    : language === "po"
                      ? (b.name_po ?? "")
                      : language === "ru"
                        ? (b.name_ru ?? "")
                        : language === "sc"
                          ? (b.name_sc ?? "")
                          : language === "sp"
                            ? (b.name_sp ?? "")
                            : "",
        })),
      );
      setNamedLocations(
        filterData.namedLocations.map((nl) => ({
          key: nl.id,
          label:
            language === "en"
              ? (nl.name_en ?? "")
              : language === "br"
                ? (nl.name_br ?? "")
                : language === "fr"
                  ? (nl.name_fr ?? "")
                  : language === "ge"
                    ? (nl.name_ge ?? "")
                    : language === "po"
                      ? (nl.name_po ?? "")
                      : language === "ru"
                        ? (nl.name_ru ?? "")
                        : language === "sc"
                          ? (nl.name_sc ?? "")
                          : language === "sp"
                            ? (nl.name_sp ?? "")
                            : "",
        })),
      );
      setVersionId(filterData.versions[0]?.id ?? null);
      applyFilter();
    }
  }, [
    language,
    filterData,
    applyFilter,
    clearFilter,
    setVersions,
    setBreakthroughs,
    setNamedLocations,
    setVersionId,
    setNamedLocationIds,
    setBreakthroughIds,
  ]);

  const handleClearFilter = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the filter?",
    );
    if (confirmed) {
      clearFilter();
      setVersionId(filterData?.versions[0]?.id ?? null);
      applyFilter();
    }
  };

  const TITLE_LABELS = titleLabels.find((l) => l.language === language)!.labels;
  const FILTER_LABELS = filterLabels.find(
    (l) => l.language === language,
  )!.labels;
  const SETTINGS_LABELS = settingsLabels.find(
    (l) => l.language === language,
  )!.labels;
  const TOPOGRAPHY_NAMES = topographyNames.find(
    (l) => l.language === language,
  )!.kv;

  return (
    <div className="flex w-full flex-col gap-4 lg:w-1/4">
      <Wrapper className="h-min md:h-min">
        <Accordion
          isCompact={true}
          className="flex flex-col gap-2"
          defaultExpandedKeys={["filter"]}
        >
          <AccordionItem
            key="filter"
            title={TITLE_LABELS.filter}
            classNames={{
              base: "-mx-2",
              trigger: "p-0",
              heading: "z-50 w-full top-0",
              title: "text-2xl uppercase text-blue-300",
              content: "overflow-hidden flex-col flex gap-2",
            }}
          >
            <div className="flex flex-col gap-1 overflow-x-hidden overflow-y-hidden md:h-dvh md:max-h-[calc(100vh-140px)] md:overflow-y-auto">
              <div className="flex flex-row gap-2">
                <Button
                  size="sm"
                  color="danger"
                  variant="faded"
                  onPress={handleClearFilter}
                  className="w-full"
                >
                  {FILTER_LABELS.clear}
                </Button>
                <Button
                  size="sm"
                  color="success"
                  className="w-full"
                  onPress={() => {
                    applyFilter();
                    if (filter.coordinates.split(" ").length > 3)
                      setAppliedCoordinates({
                        lat_dir: filter.coordinates.split(" ")[0] ?? "",
                        lat_deg: filter.coordinates.split(" ")[1] ?? "",
                        lon_dir: filter.coordinates.split(" ")[2] ?? "",
                        lon_deg: filter.coordinates.split(" ")[3] ?? "",
                      });
                  }}
                  isDisabled={isInvalid}
                >
                  {FILTER_LABELS.apply}
                </Button>
              </div>
              <Input
                value={filter.coordinates}
                onValueChange={setCoordinates}
                errorMessage="N/S -70 – 70 W/E 0 – 180"
                isInvalid={isInvalid}
                variant="underlined"
                size="sm"
                label={FILTER_LABELS.coordinates}
                placeholder="N 18 W 134"
              />
              {!isFilterDataLoading ? (
                <>
                  <Select
                    size="sm"
                    label={FILTER_LABELS.versionId}
                    variant="underlined"
                    selectedKeys={[Number(filter.versionId)]}
                    onSelectionChange={(keys) =>
                      setVersionId([...keys].map(Number)[0]!)
                    }
                  >
                    <SelectSection title="Versions list" items={versions}>
                      {(versionName) => (
                        <SelectItem>{versionName.label}</SelectItem>
                      )}
                    </SelectSection>
                  </Select>
                  <Select
                    size="sm"
                    label={FILTER_LABELS.namedLocationIds}
                    variant="underlined"
                    selectionMode="multiple"
                    selectedKeys={filter.namedLocationIds}
                    onSelectionChange={(keys) =>
                      [...keys].includes("")
                        ? setNamedLocationIds([])
                        : setNamedLocationIds([...keys].map(Number))
                    }
                  >
                    <SelectItem key={""}>Any</SelectItem>
                    <SelectSection
                      title={FILTER_LABELS.namedLocationsSection}
                      items={namedLocations}
                    >
                      {(namedLocation) => (
                        <SelectItem>{namedLocation.label}</SelectItem>
                      )}
                    </SelectSection>
                  </Select>
                  <Select
                    size="sm"
                    label={FILTER_LABELS.mapNames}
                    variant="underlined"
                    selectionMode="multiple"
                    selectedKeys={filter.mapNames}
                    onSelectionChange={(keys) =>
                      [...keys].includes("")
                        ? setMapNames([])
                        : setMapNames([...keys].map(String))
                    }
                  >
                    <SelectItem key={""}>Any</SelectItem>
                    <SelectSection
                      title={FILTER_LABELS.mapSection}
                      items={MAP_NAMES}
                    >
                      {(mapName) => <SelectItem>{mapName.label}</SelectItem>}
                    </SelectSection>
                  </Select>
                  <Select
                    size="sm"
                    label={FILTER_LABELS.topographyNames}
                    variant="underlined"
                    selectionMode="multiple"
                    selectedKeys={filter.topographyNames}
                    onSelectionChange={(keys) =>
                      [...keys].includes("")
                        ? setTopographyNames([])
                        : setTopographyNames([...keys].map(String))
                    }
                  >
                    <SelectItem key={""}>Any</SelectItem>
                    <SelectSection
                      title={FILTER_LABELS.topographySection}
                      items={TOPOGRAPHY_NAMES}
                    >
                      {(topographyName) => (
                        <SelectItem>{topographyName.label}</SelectItem>
                      )}
                    </SelectSection>
                  </Select>
                  <Select
                    size="sm"
                    label={FILTER_LABELS.breakthroughIds}
                    variant="underlined"
                    selectionMode="multiple"
                    selectedKeys={filter.breakthroughIds}
                    onSelectionChange={(keys) =>
                      [...keys].includes("")
                        ? setBreakthroughIds([])
                        : setBreakthroughIds([...keys].map(Number))
                    }
                  >
                    <SelectItem key={""}>Any</SelectItem>
                    <SelectSection
                      title={FILTER_LABELS.breakthroughsSection}
                      items={breakthroughs}
                    >
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
                label={FILTER_LABELS.altitude}
                value={[filter.minAltitude, filter.maxAltitude]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinAltitude(numbers[0]!);
                  setMaxAltitude(numbers[1]!);
                }}
                minValue={initialFilter.minAltitude}
                maxValue={initialFilter.maxAltitude}
                step={50}
              />
              <FilterSlider
                label={FILTER_LABELS.concrete}
                value={[filter.minConcrete, filter.maxConcrete]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinConcrete(numbers[0]!);
                  setMaxConcrete(numbers[1]!);
                }}
                minValue={initialFilter.minConcrete}
                maxValue={initialFilter.maxConcrete}
              />
              <FilterSlider
                label={FILTER_LABELS.water}
                value={[filter.minWater, filter.maxWater]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinWater(numbers[0]!);
                  setMaxWater(numbers[1]!);
                }}
                minValue={initialFilter.minWater}
                maxValue={initialFilter.maxWater}
              />
              <FilterSlider
                label={FILTER_LABELS.metals}
                value={[filter.minMetals, filter.maxMetals]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinMetals(numbers[0]!);
                  setMaxMetals(numbers[1]!);
                }}
                minValue={initialFilter.minMetals}
                maxValue={initialFilter.maxMetals}
              />
              <FilterSlider
                label={FILTER_LABELS.rareMetals}
                value={[filter.minRareMetals, filter.maxRareMetals]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinRareMetals(numbers[0]!);
                  setMaxRareMetals(numbers[1]!);
                }}
                minValue={initialFilter.minRareMetals}
                maxValue={initialFilter.maxRareMetals}
              />
              <FilterSlider
                label={FILTER_LABELS.temperature}
                value={[filter.minTemperature, filter.maxTemperature]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinTemperature(numbers[0]!);
                  setMaxTemperature(numbers[1]!);
                }}
                minValue={initialFilter.minTemperature}
                maxValue={initialFilter.maxTemperature}
              />
              <FilterSlider
                label={FILTER_LABELS.meteors}
                value={[filter.minMeteors, filter.maxMeteors]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinMeteors(numbers[0]!);
                  setMaxMeteors(numbers[1]!);
                }}
                minValue={initialFilter.minMeteors}
                maxValue={initialFilter.maxMeteors}
              />
              <FilterSlider
                label={FILTER_LABELS.dustDevils}
                value={[filter.minDustDevils, filter.maxDustDevils]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinDustDevils(numbers[0]!);
                  setMaxDustDevils(numbers[1]!);
                }}
                minValue={initialFilter.minDustDevils}
                maxValue={initialFilter.maxDustDevils}
              />
              <FilterSlider
                label={FILTER_LABELS.dustStorms}
                value={[filter.minDustStorms, filter.maxDustStorms]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinDustStorms(numbers[0]!);
                  setMaxDustStorms(numbers[1]!);
                }}
                minValue={initialFilter.minDustStorms}
                maxValue={initialFilter.maxDustStorms}
              />
              <FilterSlider
                label={FILTER_LABELS.coldWaves}
                value={[filter.minColdWaves, filter.maxColdWaves]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinColdWaves(numbers[0]!);
                  setMaxColdWaves(numbers[1]!);
                }}
                minValue={initialFilter.minColdWaves}
                maxValue={initialFilter.maxColdWaves}
              />
              <FilterSlider
                label={FILTER_LABELS.difficulty}
                value={[filter.minDifficulty, filter.maxDifficulty]}
                onChange={(values) => {
                  const numbers = values as number[];
                  setMinDifficulty(numbers[0]!);
                  setMaxDifficulty(numbers[1]!);
                }}
                minValue={initialFilter.minDifficulty}
                maxValue={initialFilter.maxDifficulty}
              />
            </div>
          </AccordionItem>
          <AccordionItem
            key="settings"
            title={TITLE_LABELS.settings}
            classNames={{
              base: "-mx-2",
              trigger: "p-0",
              heading: "z-50 w-full top-0",
              title: "text-2xl uppercase text-blue-300",
              content: "overflow-hidden flex-col flex gap-2",
            }}
          >
            <div className="flex flex-col gap-1">
              <Switch
                size="sm"
                isSelected={showCanvas}
                onValueChange={setShowCanvas}
              >
                {SETTINGS_LABELS.map}
              </Switch>
              <Switch size="sm" isSelected={spin} onValueChange={setSpin}>
                {SETTINGS_LABELS.animation}
              </Switch>
              <Select
                size="sm"
                label={SETTINGS_LABELS.language}
                variant="underlined"
                selectedKeys={[language]}
                onSelectionChange={(keys) =>
                  setLanguage([...keys].map(String)[0]!)
                }
              >
                <SelectSection
                  title={SETTINGS_LABELS.language}
                  items={languages}
                >
                  {(languageName) => (
                    <SelectItem>{languageName.label}</SelectItem>
                  )}
                </SelectSection>
              </Select>
            </div>
          </AccordionItem>
        </Accordion>
      </Wrapper>
    </div>
  );
}
