"use client";
import { Button } from "@heroui/react";
import Papa from "papaparse";
import { useState } from "react";
import { api } from "~/trpc/react";

type CSVLangRow = {
  name_en: string;
  name_br: string;
  name_fr: string;
  name_ge: string;
  name_po: string;
  name_ru: string;
  name_sc: string;
  name_sp: string;
};

export function NamedLocations() {
  const [isParsing, setIsParsing] = useState(false);

  const utils = api.useUtils();
  const namedLocationsMutation = api.location.seedNamedLocations.useMutation({
    onSuccess: async () => {
      await utils.location.invalidate();
    },
  });
  const [namedLocations] = api.location.getNamedLocations.useSuspenseQuery();

  const handleSeedLocations = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to seed the named locations? This will overwrite all existing named locations.",
    );
    if (!confirmed) return;
    setIsParsing(true);
    const response = await fetch("/strings/locations.csv");
    const data = await response.text();
    const rows: CSVLangRow[] = [];
    Papa.parse(data, {
      worker: true,
      header: true,
      step: function (results) {
        const row = results.data as CSVLangRow;
        if (!!row.name_en) rows.push(row);
      },
      complete: function () {
        console.log(rows);
        namedLocationsMutation.mutate({ names: rows });
        setIsParsing(false);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button className="mx-auto w-min" onPress={handleSeedLocations}>
        Seed Locations
      </Button>
      {isParsing && <p>Parsing CSV...</p>}
      {!isParsing &&
        namedLocations.map((row, i) => (
          <div className="grid grid-cols-8 justify-between" key={i}>
            <p>{row.name_en}</p>
            <p>{row.name_br}</p>
            <p>{row.name_fr}</p>
            <p>{row.name_ge}</p>
            <p>{row.name_po}</p>
            <p>{row.name_ru}</p>
            <p>{row.name_sc}</p>
            <p>{row.name_sp}</p>
          </div>
        ))}
    </div>
  );
}
