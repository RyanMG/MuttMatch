'use client';

import { ReactNode } from "react";
import BreedSelect from "./filters/BreedSelect";
import BreedSelections from "./filters/BreedSelections";
import SearchByLocation from "./filters/SearchByLocation";
import AgeRangeSliders from "./filters/AgeRangeSliders";

export default function SearchFilters(): ReactNode {

  return (
    <>
      <section className="flex flex-row w-full gap-2">
        <div className="w-1/2">
          <BreedSelect />
        </div>

        <div className="w-1/2">
          <SearchByLocation />
        </div>
      </section>
      <section className="flex flex-row w-full gap-2">
        <BreedSelections />
      </section>
      <div className="w-full">
          <AgeRangeSliders />
        </div>
    </>
  )
}
