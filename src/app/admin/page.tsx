"use client";
// import Papa from "papaparse";
// import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

// type Row = {
//   Altitude: string;
//   "Breakthrough 1": string;
//   "Breakthrough 2": string;
//   "Breakthrough 3": string;
//   "Breakthrough 4": string;
//   "Breakthrough 5": string;
//   "Breakthrough 6": string;
//   "Breakthrough 7": string;
//   "Breakthrough 8": string;
//   "Breakthrough 9": string;
//   "Breakthrough 10": string;
//   "Breakthrough 11": string;
//   "Breakthrough 12": string;
//   "Breakthrough 13"?: string;
//   "Breakthrough 14"?: string;
//   "Breakthrough 15"?: string;
//   "Breakthrough 16"?: string;
//   "Breakthrough 17"?: string;
//   "Cold Waves": string;
//   Concrete: string;
//   "Difficulty Challenge": string;
//   "Dust Devils": string;
//   "Dust Storms": string;
//   Latitude: string;
//   "Latitude °": string;
//   Longitude: string;
//   "Longitude °": string;
//   "Map Name": string;
//   Metals: string;
//   Meteors: string;
//   "Named Location": string;
//   "Rare Metals": string;
//   Temperature: string;
//   Topography: string;
//   Water: string;
// };

export default function Admin() {
  // const [isParsing, setIsParsing] = useState(false);
  // const [evansGP, setEvansGP] = useState<Row[]>([]);
  // const [picardBB, setPicardBB] = useState<Row[]>([]);
  // const [picardGPBB, setPicardGPBB] = useState<Row[]>([]);
  // const [picardGP, setPicardGP] = useState<Row[]>([]);
  // const [picard, setPicard] = useState<Row[]>([]);
  // const [titoGP, setTitoGP] = useState<Row[]>([]);
  // const [log, setLog] = useState<string[]>([]);

  // async function fetchCSV(
  //   file: string,
  //   stateCallback?: Dispatch<SetStateAction<Row[]>>,
  // ) {
  //   setIsParsing(true);
  //   const response = await fetch(file);
  //   const data = await response.text();
  //   const rows: Row[] = [];
  //   Papa.parse(data, {
  //     worker: true,
  //     header: true,
  //     step: function (results) {
  //       const row = results.data as Row;
  //       rows.push(row);
  //     },
  //     complete: function () {
  //       stateCallback?.(rows);
  //     },
  //   });
  //   setIsParsing(false);
  // }

  // useEffect(() => {
  //   void fetchCSV("/mapdata/Evans_GP.csv", setEvansGP);
  //   void fetchCSV("/mapdata/Picard_BB.csv", setPicardBB);
  //   void fetchCSV("/mapdata/Picard_GP_BB.csv", setPicardGPBB);
  //   void fetchCSV("/mapdata/Picard_GP.csv", setPicardGP);
  //   void fetchCSV("/mapdata/Picard.csv", setPicard);
  //   void fetchCSV("/mapdata/Tito_GP.csv", setTitoGP);
  // }, []);

  // useEffect(() => {
  //   if (
  //     !!evansGP.length &&
  //     !!picardBB.length &&
  //     !!picardGPBB.length &&
  //     !!picardGP.length &&
  //     !!picard.length &&
  //     !!titoGP.length
  //   ) {
  //     setLog((prev) => [...prev, evansGP.length + " Evans GP maps loaded"]);
  //     setLog((prev) => [...prev, picardBB.length + " Picard BB maps loaded"]);
  //     setLog((prev) => [
  //       ...prev,
  //       picardGPBB.length + " Picard GP BB maps loaded",
  //     ]);
  //     setLog((prev) => [...prev, picardGP.length + " Picard GP maps loaded"]);
  //     setLog((prev) => [...prev, picard.length + " Picard maps loaded"]);
  //     setLog((prev) => [...prev, titoGP.length + " Tito GP maps loaded"]);
  //   }
  // }, [evansGP, picardBB, picardGPBB, picardGP, picard, titoGP]);

  return <div className="flex flex-col items-center justify-center"></div>;
}
