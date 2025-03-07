import { Button, Select, SelectItem, Checkbox } from "@heroui/react";
import { api } from "~/trpc/react";
import Papa from "papaparse";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type CSVDataRow = {
  Coordinates?: string;
  Altitude: string;
  "Breakthrough 1"?: string;
  "Breakthrough 2"?: string;
  "Breakthrough 3"?: string;
  "Breakthrough 4"?: string;
  "Breakthrough 5"?: string;
  "Breakthrough 6"?: string;
  "Breakthrough 7"?: string;
  "Breakthrough 8"?: string;
  "Breakthrough 9"?: string;
  "Breakthrough 10"?: string;
  "Breakthrough 11"?: string;
  "Breakthrough 12"?: string;
  "Breakthrough 13"?: string;
  "Breakthrough 14"?: string;
  "Breakthrough 15"?: string;
  "Breakthrough 16"?: string;
  "Breakthrough 17"?: string;
  "Cold Waves": string;
  Concrete: string;
  "Difficulty Challenge": string;
  "Dust Devils": string;
  "Dust Storms": string;
  Latitude: string;
  "Latitude °": string;
  Longitude: string;
  "Longitude °": string;
  "Map Name": string;
  Metals: string;
  Meteors: string;
  "Named Location": string;
  "Rare Metals": string;
  Temperature: string;
  Topography: string;
  Water: string;
};

const VERSIONS = [
  { name: "No DLCs", path: "/mapdata/nodlcs.csv" },
  { name: "BB - No PA", path: "/mapdata/bb_nopa.csv" },
  { name: "GP + BB - No PA", path: "/mapdata/gp_bb_nopa.csv" },
  { name: "BB", path: "/mapdata/bb.csv" },
  { name: "GP + BB", path: "/mapdata/gp_bb.csv" },
  { name: "GP", path: "/mapdata/gp.csv" },
];

export function Locations() {
  const [isParsing, setIsParsing] = useState(false);
  const [locationsData, setLocationsData] = useState<CSVDataRow[]>([]);
  const [version, setVersion] = useState<string>(VERSIONS[0]!.name);
  const [override, setOverride] = useState(false);

  const [firstHundredLocations] =
    api.location.getFirstHundredLocations.useSuspenseQuery();
  const utils = api.useUtils();
  const locationsMutation = api.location.seedLocations.useMutation({
    onSuccess: async (result) => {
      alert(result.message);
      await utils.location.invalidate();
      setLocationsData([]);
    },
  });
  const deleteBreakthroughsMutation =
    api.location.deleteBreakthroughs.useMutation({
      onSuccess: async (result) => {
        alert(result.message);
        await utils.location.invalidate();
        setLocationsData([]);
      },
    });

  async function fetchCSV(
    file: string,
    stateCallback?: Dispatch<SetStateAction<CSVDataRow[]>>,
  ) {
    setIsParsing(true);
    const response = await fetch(file);
    const data = await response.text();
    const rows: CSVDataRow[] = [];
    Papa.parse(data, {
      worker: true,
      header: true,
      step: function (results) {
        const row = results.data as CSVDataRow;
        if (!!row.Longitude) rows.push(row);
      },
      complete: function () {
        stateCallback?.(rows);
        setIsParsing(false);
      },
    });
  }

  const handleSeedLocations = () => {
    const path = VERSIONS.find((v) => v.name === version)!.path;
    void fetchCSV(path, setLocationsData);
  };

  useEffect(() => {
    if (!!locationsData.length && !locationsMutation.isPending) {
      locationsMutation.mutate({
        version,
        rows: locationsData,
        override,
      });
    }
  }, [locationsData, locationsMutation, version, override]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        <Select
          size="sm"
          label="Version"
          selectedKeys={[version]}
          onChange={(e) => setVersion(e.target.value)}
        >
          {VERSIONS.map((version) => (
            <SelectItem key={version.name} className="text-foreground">
              {version.name}
            </SelectItem>
          ))}
        </Select>
        <Checkbox isSelected={override} onValueChange={setOverride}>
          Override
        </Checkbox>
        <div className="flex h-full w-min flex-col">
          <Button size="lg" onPress={handleSeedLocations}>
            Seed Locations
          </Button>
        </div>
        <div className="flex h-full w-min flex-col">
          <Button
            size="lg"
            onPress={() => {
              const confiremed = window.confirm(
                `Are you sure you want to delete all breakthroughs for ${version}?.`,
              );
              if (confiremed) deleteBreakthroughsMutation.mutate({ version });
            }}
          >
            Delete Breakthroughs
          </Button>
        </div>
      </div>
      {isParsing && <p>Parsing CSV...</p>}
      <div className="flex flex-col gap-2 py-2">
        <div className="grid grid-cols-4 justify-between text-xl">
          <p>Coordinates</p>
          <p>Map Name</p>
          <p>Location Name</p>
          <p>Breakthroughs</p>
        </div>
        {firstHundredLocations?.map((loc, i) => (
          <div className="grid grid-cols-4 justify-between" key={i}>
            <p>
              {loc.lat_dir} {loc.lat_deg} {loc.lon_dir} {loc.lon_deg}
            </p>
            <p>{loc.map_name}</p>
            <p>{loc.namedLoc?.name_en}</p>
            <p>
              {[
                ...new Set(
                  loc.bts_loc.map(
                    (bt) =>
                      bt.ver.name +
                      ": " +
                      loc.bts_loc.filter((b) => b.ver.name === bt.ver.name)
                        .length,
                  ),
                ),
              ].join(",\n")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
