'use client';

import { ReactNode } from "react";

import BreedSelect from "./filters/BreedSelect";
// import SearchByLocation from "./filters/SearchByLocation";
// import AgeRangeSliders from "./filters/AgeRangeSliders";
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";

export default function SearchFilters(): ReactNode {

  const { breeds } = useSearchFilterQueryContext()
  return (
    <>
      <section className="flex flex-row w-full">
        <div className="w-1/3">
          <BreedSelect
            breedSelection={breeds?.current || []}

          />
        </div>
        {/* <div className="w-1/3">
          <SearchByLocation
            selectedLocation={searchParams.get('location')?.toString()}
            handleChange={handleLocationChange}
          />
        </div>

        <div className="w-1/3">
          <AgeRangeSliders
            minAgeSelection={minAge}
            maxAgeSelection={maxAge}
            handleChange={handleAgeRangeChange}
          />
        </div> */}
      </section>
    </>
  )
}
