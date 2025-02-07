'use client';

import { ReactNode, useState, useCallback } from "react";
import BreedSelect from "./filters/BreedSelect";
import SearchByLocation from "./filters/SearchByLocation";
import AgeRangeSliders from "./filters/AgeRangeSliders";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { TStateAbbr } from "@definitions/location";
import Button from "@ui/common/Button";

// Possible filters
// 1. Breed
// 2. Zip code
// 3. Age range
// 4. sort by and direction

export default function SearchFilters({
  breedSelection = [] as string[],
  citySelection,
  stateSelection,
  minAgeSelection,
  maxAgeSelection
}: {
  breedSelection?: string[];
  citySelection?: string | undefined;
  stateSelection?: TStateAbbr | null;
  minAgeSelection?: number;
  maxAgeSelection?: number;
}): ReactNode {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [filtersShown, showFilters] = useState<boolean>(false);
  const [breeds, setBreeds] = useState<string[]>(breedSelection);
  const [city, setCity] = useState<string>(citySelection ?? "");
  const [state, setState] = useState<TStateAbbr | null>(stateSelection ?? null);
  const [minAge, setMinAge] = useState<number>(minAgeSelection ?? 0);
  const [maxAge, setMaxAge] = useState<number>(maxAgeSelection ?? 20);

  /**
   * Apply the currently selected filter into the URL params
   */
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (breeds) params.set('breed', breeds.join(','))
    else params.delete('breed');

    if (city && state) {
      params.set('city', `${city}`)
      params.set('state', `${state}`)
    } else {
      params.delete('city');
      params.delete('state');
    }

    if (minAge) params.set('minAge', `${minAge}`)
    else params.delete('minAge');
    if (maxAge) params.set('maxAge', `${maxAge}`)
    else params.delete('maxAge');

    replace(`${pathname}?${params.toString()}`);

  }, [breeds, city, state, minAge, maxAge]);

  /**
   * Updating the URL live was leading to a sluggish UI.
   * Set the filters into state and apply them when the user chooses to start the search
   */
  const handleBreedChange = useCallback((breeds: string[]) => {
    setBreeds(breeds.map(breed => breed.toLowerCase()));
  }, []);

  const handleLocationChange = useCallback((city : string, state: TStateAbbr) => {
    setCity(city);
    setState(state);
  }, []);

  const handleAgeRangeChange = useCallback((ages: number[]) => {
    setMinAge(ages[0]);
    setMaxAge(ages[1]);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {!filtersShown &&
        <Button
          type="button"
          theme="secondary"
          onClick={() => {
            showFilters(true);
          }}
        >
          <p>Filter Results</p>
        </Button>
      }

        <section className={`w-full transition-[height] duration-500 ease-in-out ${filtersShown ? 'h-[200px]' : 'h-0'}`}>
          <div className={`flex flex-col justify-between h-full transition-[opacity] duration-500 ease-in-out ${filtersShown ? 'opacity-100' : 'opacity-0'}`}>
            <div></div>
            <Button
              type="button"
              theme="secondary"
              onClick={() => {
                showFilters(false);
              }}
            >
              <p>Hide Filters</p>
            </Button>
          </div>
        </section>



      {/* <section className="flex flex-row w-full">
        <div className="w-1/3 overflow-hidden flex items-center justify-center">
          <BreedSelect
            breedSelection={breeds}
            handleChange={handleBreedChange}
          />
        </div>
        <div className="w-1/3 overflow-hidden flex items-center justify-center">
          <SearchByLocation
            selectedLocation={searchParams.get('location')?.toString()}
            handleChange={handleLocationChange}
          />
        </div>

        <div className="w-1/3 h-28 overflow-hidden flex items-center justify-center">
          <AgeRangeSliders
            minAgeSelection={minAge}
            maxAgeSelection={maxAge}
            handleChange={handleAgeRangeChange}
          />
        </div>
      </section>
      <section className="flex flex-row w-full">
        <Button
          type="button"
          theme="secondary"
          onClick={() => {
            applyFilters();
          }}
        >
          <p>Apply Filters</p>
        </Button>
      </section> */}
    </div>

  )
}
