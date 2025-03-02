"use client";
import { Button } from "@heroui/react";
import Papa from "papaparse";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
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

export function Breakthroughs() {
  const [isParsing, setIsParsing] = useState(false);
  const [names, setNames] = useState<CSVLangRow[]>([]);
  const [descs, setDescs] = useState<CSVLangRow[]>([]);

  const utils = api.useUtils();
  const breakthroughsMutation = api.location.seedBreakthroughs.useMutation({
    onSuccess: async () => {
      await utils.location.invalidate();
    },
  });
  const [breackthroughList] = api.location.getBreakthroughs.useSuspenseQuery();

  useEffect(() => {
    if (!!names.length && !!descs.length) {
      breakthroughsMutation.mutate({ names, descs });
      setNames([]);
      setDescs([]);
    }
  }, [names, descs, breakthroughsMutation]);

  const removeBS = (str: string) => {
    return str
      .replaceAll("<color flavor>", "")
      .replaceAll("<color em>", "")
      .replaceAll("</color>", "")
      .replaceAll("<right>", "")
      .replaceAll("</right>", "")
      .replaceAll("<left>", "")
      .replaceAll("</left>", "");
  };

  const parseNamesCSV = async (
    path: string,
    stateCallback?: Dispatch<SetStateAction<CSVLangRow[]>>,
  ) => {
    const responseNames = await fetch(path);
    const dataNames = await responseNames.text();
    const rowsNames: CSVLangRow[] = [];
    Papa.parse(dataNames, {
      worker: true,
      header: true,
      step: function (results) {
        const row = results.data as CSVLangRow;
        if (!!row.name_en)
          rowsNames.push({
            name_en: removeBS(row.name_en),
            name_br: removeBS(row.name_br),
            name_fr: removeBS(row.name_fr),
            name_ge: removeBS(row.name_ge),
            name_po: removeBS(row.name_po),
            name_ru: removeBS(row.name_ru),
            name_sc: removeBS(row.name_sc),
            name_sp: removeBS(row.name_sp),
          });
      },
      complete: function () {
        stateCallback?.(rowsNames);
      },
    });
  };

  const handleSeedLocations = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to seed the breakthroughs? This will overwrite all existing breakthroughs.",
    );
    if (!confirmed) return;
    setIsParsing(true);
    parseNamesCSV("/strings/bt.csv", setNames)
      .then(() => {
        parseNamesCSV("/strings/bt_desc.csv", setDescs)
          .then(() => {
            setIsParsing(false);
          })
          .catch((err) => {
            console.error(err);
            setIsParsing(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setIsParsing(false);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button className="mx-auto w-min" onPress={handleSeedLocations}>
        Seed Breakthroughs
      </Button>
      {isParsing && <p>Parsing CSV...</p>}
      {!isParsing &&
        breackthroughList.map((row, i) => (
          <div className="grid grid-cols-8 justify-between py-4" key={i}>
            <p>{row.name_en}</p>
            <p>{row.name_br}</p>
            <p>{row.name_fr}</p>
            <p>{row.name_ge}</p>
            <p>{row.name_po}</p>
            <p>{row.name_ru}</p>
            <p>{row.name_sc}</p>
            <p>{row.name_sp}</p>
            <div className="col-span-8">{row.desc_en}</div>
            <div className="col-span-8">{row.desc_br}</div>
            <div className="col-span-8">{row.desc_fr}</div>
            <div className="col-span-8">{row.desc_ge}</div>
            <div className="col-span-8">{row.desc_po}</div>
            <div className="col-span-8">{row.desc_ru}</div>
            <div className="col-span-8">{row.desc_sc}</div>
            <div className="col-span-8">{row.desc_sp}</div>
          </div>
        ))}
    </div>
  );
}
