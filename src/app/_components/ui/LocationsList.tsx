"use client";
import Wrapper from "./Wrapper";
import {
  Accordion,
  AccordionItem,
  Table,
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@heroui/react";

export default function LocationsList() {
  return (
    <Wrapper style={{ minWidth: "min-content", width: "60%" }}>
      <Accordion isCompact={true} className="flex flex-col gap-2">
        <AccordionItem
          title="Locations List"
          classNames={{
            base: "-mx-2",
            trigger: "p-0",
            heading: "z-50 w-full top-0",
            title: "text-2xl uppercase text-blue-300",
            content: "h-fit overflow-scroll max-h-[calc(100vh-112px)]",
          }}
        >
          <div className="flex flex-grow flex-col"></div>
        </AccordionItem>
      </Accordion>
    </Wrapper>
  );
}
