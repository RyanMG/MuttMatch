'use client';

import { ReactNode, Suspense } from "react"
import PageLoading from "@ui/common/PageLoading";
import DogCard from "@ui/dog-search/DogCard";
import CurrentResultFiltersNotice from "@ui/dog-search/CurrentResultFiltersNotice";
import Pagination from "./Pagination";
import { getTotalPages } from "@utils/paginationUtils";

import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";

import {
  NUM_RESULTS_PER_PAGE
} from "@constants/api";

import {
  TDog
} from "@definitions/dogs";

export default function DogSearchResults(): ReactNode {
  const {resultsLoading, searchResults, totalResults} = useSearchFilterQueryContext();

  return (
    <>
      {resultsLoading && <PageLoading />}
      {!resultsLoading &&
        <>
          <Suspense>
            <CurrentResultFiltersNotice />
          </Suspense>

          <div className="flex flex-wrap overflow-scroll no-scrollbar">
            {!searchResults && <p>no results</p>}
            {searchResults && searchResults.current.map((result: TDog) => {
              return <DogCard key={result.id} dog={result} />
            })}
          </div>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={getTotalPages(totalResults?.current, NUM_RESULTS_PER_PAGE)} />
          </div>
      </>
      }
    </>
  )
}
