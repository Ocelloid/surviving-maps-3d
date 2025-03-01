"use client";
import Papa from "papaparse";
import { useEffect, useState } from "react";

type Row = {
  Altitude: string;
  "Breakthrough 1": string;
  "Breakthrough 2": string;
  "Breakthrough 3": string;
  "Breakthrough 4": string;
  "Breakthrough 5": string;
  "Breakthrough 6": string;
  "Breakthrough 7": string;
  "Breakthrough 8": string;
  "Breakthrough 9": string;
  "Breakthrough 10": string;
  "Breakthrough 11": string;
  "Breakthrough 12": string;
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

export default function Admin() {
  const [isParsing, setIsParsing] = useState(false);
  const [data, setData] = useState<Row[]>([]);

  async function fetchCSV() {
    setIsParsing(true);
    const response = await fetch("mapdata/Trim.csv");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const rows: Row[] = [];
    Papa.parse(data, {
      worker: true,
      header: true,
      step: function (results) {
        const row = results.data as Row;
        console.log(row);
        rows.push(row);
      },
      complete: function () {
        console.log("CSV file successfully processed");
        setData(rows);
      },
      error: function () {
        console.error("Error parsing CSV");
      },
    });
    setIsParsing(false);
  }

  useEffect(() => {
    void fetchCSV();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {isParsing ? (
        <div className="flex flex-col items-center justify-center">
          <p>Parsing...</p>
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <p>Data</p>
          <div className="flex w-full flex-col">
            {data.map((row, index) => (
              <div key={index} className="flex flex-row items-start">
                {row.Longitude} {row["Longitude °"]} {row.Latitude}{" "}
                {row["Latitude °"]}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <p>mapdata</p>
      Latitude °,Latitude,Longitude °,Longitude,Topography,Difficulty
      Challenge,Altitude,Temperature,Metals,Rare Metals,Concrete,Water,Dust
      Devils,Dust Storms,Meteors,Cold Waves,Map Name,Named Location,Breakthrough
      1,Breakthrough 2,Breakthrough 3,Breakthrough 4,Breakthrough 5,Breakthrough
      6,Breakthrough 7,Breakthrough 8,Breakthrough 9,Breakthrough
      10,Breakthrough 11,Breakthrough 12,Breakthrough 13,Breakthrough
      14,Breakthrough 15,Breakthrough 16,Breakthrough 17
      <br />
      <br />
      <p>bt_desc</p>
      name_en,name_br,name_fr,name_ge,name_po,name_ru,name_sc,name_sp
      <br />
      <br />
      <p>bt</p>
      name_en,name_br,name_fr,name_ge,name_po,name_ru,name_sc,name_sp
      <br />
      <br />
      <p>locations</p>
      name_en,name_br,name_fr,name_ge,name_po,name_ru,name_sc,name_sp
      <br />
      <br />
      <p>misc</p>
      name_en,name_br,name_fr,name_ge,name_po,name_ru,name_sc,name_sp */}
    </div>
  );
}
