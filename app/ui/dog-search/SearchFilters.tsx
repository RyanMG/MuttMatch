'use client';

import { ReactNode, useState } from "react";
import BreedSelect from "./filters/BreedSelect";
import SearchByLocation from "./filters/SearchByLocation";
import AgeRangeSliders from "./filters/AgeRangeSliders";
import {SelectChangeEvent} from "@mui/material/Select";

import { TDog } from "@definitions/dogs";

// Possible filters
// 1. Breed
// 2. Zip code
// 3. Age range
// 4. sort by and direction

export default function SearchFilters(): ReactNode {
  const [breed, setBreed] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setBreed(event.target.value as TDog['breed']);
  };

  return (
    <section className="flex flex-row w-full">
      <div className="w-1/3 overflow-hidden flex items-center justify-center">
        <BreedSelect
          breedSelection={breed}
          handleChange={handleChange}
        />
      </div>

      <div className="w-1/3 overflow-hidden flex items-center justify-center">
        <SearchByLocation />
      </div>

      <div className="w-1/3 h-28 overflow-hidden flex items-center justify-center">
        <AgeRangeSliders />
      </div>
    </section>
  )
}
