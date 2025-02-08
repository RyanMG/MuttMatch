'use client';

import { ReactNode } from "react";

import BreedSelect from "./filters/BreedSelect";
// import SearchByLocation from "./filters/SearchByLocation";
import AgeRangeSliders from "./filters/AgeRangeSliders";

export default function SearchFilters(): ReactNode {

  return (
    <>
      <section className="flex flex-row w-full">
        <div className="w-1/3">
          <BreedSelect />
        </div>
        {/* <div className="w-1/3">
          <SearchByLocation
            selectedLocation={searchParams.get('location')?.toString()}
            handleChange={handleLocationChange}
          />
        </div>
        */}
        <div className="w-1/3">
          <AgeRangeSliders />
        </div>
      </section>
    </>
  )
}
