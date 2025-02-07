'use client';

import { ReactNode, useState } from "react";
import Button from "@ui/common/Button";
import SearchFilters from "./SearchFilters";
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";

export default function SearchFiltersWrapper(): ReactNode {

  const [filtersShown, setFiltersShown] = useState<boolean>(false);
  const { applyFilters } = useSearchFilterQueryContext()

  return (
    <div className="w-full flex flex-col">
      {!filtersShown &&
        <Button
          type="button"
          theme="secondary"
          onClick={() => {
            setFiltersShown(true);
          }}
        >
          <p>Filter Results</p>
        </Button>
      }

      <section className={`w-full transition-[height] duration-500 ease-in-out ${filtersShown ? 'h-[200px]' : 'delay-300 h-0'}`}>
        <div className={`flex flex-col justify-between h-full transition-[opacity] duration-500 ease-in-out ${filtersShown ? 'delay-300 opacity-100' : 'opacity-0'}`}>
          <SearchFilters />
          <Button
            type="button"
            theme="secondary"
            onClick={() => {
              applyFilters();
              setFiltersShown(false);
            }}
          >
            <p>Apply Filters</p>
          </Button>
        </div>
      </section>
    </div>

  )
}
