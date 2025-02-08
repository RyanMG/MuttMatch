'use client';

import { ReactNode, useState } from "react";
import Button from "@ui/common/Button";
import SearchFilters from "./SearchFilters";
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";

export default function SearchFiltersWrapper(): ReactNode {

  const [filtersShown, setFiltersShown] = useState<boolean>(false);
  const { applyFilters, setPage, clearFilters } = useSearchFilterQueryContext()

  return (
    <div className="w-full flex flex-col">
      {!filtersShown &&
        <div className="w-full flex flex-row gap-2">
          <div className="w-1/2">
            <Button
              type="button"
              theme="primary"
              fullWidth
              onClick={() => {
                setFiltersShown(true);
              }}
            >
              <p>Filter Results</p>
            </Button>
          </div>

          <div className="w-1/2">
              <Button
              type="button"
              theme="secondary"
              fullWidth
              onClick={() => {
                clearFilters();
                setFiltersShown(false);
              }}
            >
              <p>Clear Filters</p>
            </Button>
          </div>
        </div>
      }

      <section className={`w-full transition-[height] duration-500 ease-in-out ${filtersShown ? 'h-[200px]' : 'delay-300 h-0'}`}>
        <div className={`flex flex-col justify-between h-full transition-[opacity] duration-500 ease-in-out ${filtersShown ? 'delay-300 opacity-100' : 'opacity-0'}`}>
          <SearchFilters />
          <div className="w-full flex flex-row gap-2">
            <div className="w-1/2">
              <Button
                type="button"
                theme="primary"
                fullWidth
                onClick={() => {
                  setPage(1);
                  applyFilters();
                  setFiltersShown(false);
                }}
              >
                <p>Apply Filters</p>
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                type="button"
                theme="destroy"
                fullWidth
                onClick={() => {
                  clearFilters();
                }}
              >
                <p>Clear Filters</p>
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                type="button"
                theme="secondary"
                fullWidth
                onClick={() => {
                  setFiltersShown(false);
                }}
              >
                <p>Cancel</p>
              </Button>
            </div>

          </div>
         </div>
      </section>
    </div>

  )
}
