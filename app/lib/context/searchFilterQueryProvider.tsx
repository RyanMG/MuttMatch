'use client';

import {createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState, Dispatch, SetStateAction, RefObject} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {TDog} from '@definitions/dogs';
import {
  searchDogs
} from "@api/dogs";

/**
 * CONTEXT
 */
const SearchFilterQueryContext = createContext<{
  query: RefObject<URLSearchParams> | null;
  setShouldApplyFilters: Dispatch<SetStateAction<boolean>>;
  breeds: string[];
  setBreeds: (breedList: string[]) => void;
  currentPage: number;
  setPage: (page: number) => void;
  ageRange: number[];
  setAgeRange: (ages: number[]) => void;
  searchResults: RefObject<TDog[]> | null;
  resultsLoading: boolean;
  totalResults: RefObject<number> | null;
  clearFilters: () => void;
}>({
  query: null,
  setShouldApplyFilters: () => null,
  breeds: [],
  setBreeds: () => null,
  currentPage: 1,
  setPage: () => null,
  ageRange: [0, 15],
  setAgeRange: () => null,
  searchResults: null,
  resultsLoading: false,
  totalResults: null,
  clearFilters: () => null
});

/**
 * PROVIDER
 */
export default function SearchFilterQueryProvider({
  children
}:{
  children: ReactNode,

}): ReactNode {

  const router = useRouter();
  const pathname = usePathname();
  const initialSearchParams = useSearchParams();

  const initialBreeds = initialSearchParams.getAll('breeds');
  const initialPage = initialSearchParams.get('page');
  const initialAgeRange = [Number(initialSearchParams.get('minAge')), Number(initialSearchParams.get('maxAge') || 15)];

  const searchResults = useRef<TDog[]>([] as TDog[]);
  const totalResults = useRef<number>(1);

  const [resultsLoading, setResultsLoading] = useState<boolean>(true);

  const [breeds, setBreeds] = useState<string[]>(initialBreeds ? initialBreeds : []);
  const [currentPage, setCurrentPage] = useState<number>(initialPage ? Number(initialPage) : 1);
  const [ageRange, setAgeRange] = useState<number[]>(initialAgeRange);

  const [shouldApplyFilters, setShouldApplyFilters] = useState<boolean>(false);

  const query = useRef<URLSearchParams>(new URLSearchParams(initialSearchParams));

  const setPage = (newPage: number) => {
    setCurrentPage(newPage);
    setShouldApplyFilters(true);
  }

  const clearFilters = () => {
    setBreeds([]);
    setCurrentPage(1);
    setAgeRange([0, 20]);
    setShouldApplyFilters(true);
  }

  /**
   * Apply the currently selected filter into the URL params
   */
  const applyFilters = useCallback(async () => {
    const params = query.current;
    params.set('page', currentPage.toString());

    params.delete('breeds');

    if (breeds) {
      breeds.forEach(breed => params.append('breeds', breed))
    }

    // if (city && state) {
    //   params.set('city', `${city}`)
    //   params.set('state', `${state}`)
    // } else {
    //   params.delete('city');
    //   params.delete('state');
    // }

    if (ageRange[0] !== 0) params.set('minAge', `${ageRange[0]}`)
    else params.delete('minAge');
    if (ageRange[1] !== 20) params.set('maxAge', `${ageRange[1]}`)
    else params.delete('maxAge');

    router.replace(`${pathname}?${params.toString()}`);
    query.current = new URLSearchParams(params);
    fetchSearchResults();
  }, [query, breeds, currentPage, ageRange]);

  /**
   * Fetch results
   */
  const fetchSearchResults = useCallback(async () => {
    setResultsLoading(true);
    const resp = await searchDogs({
      breeds: breeds,
      ageRange: ageRange,
      page: currentPage,
    });

    if (resp === "Unauthorized") {
      router.push('/logout');
      return;
    }

    if ('error' in resp) {
      return;
    }

    searchResults.current = resp.dogs;
    totalResults.current = resp.total;
    setResultsLoading(false);
  }, [breeds, currentPage, ageRange])

  useEffect(() => {
    fetchSearchResults();
  }, [])

  useEffect(() => {
    if (shouldApplyFilters) {
      applyFilters();
      setShouldApplyFilters(false);
    }
  }, [shouldApplyFilters])

  return (
    <SearchFilterQueryContext.Provider
      value={{
        query,
        setShouldApplyFilters,
        breeds,
        setBreeds,
        currentPage,
        setPage,
        ageRange,
        setAgeRange,
        searchResults,
        resultsLoading,
        totalResults,
        clearFilters
      }}
    >
      {children}
    </SearchFilterQueryContext.Provider>
  );
};

// This hook can be used to access the user info.
export function useSearchFilterQueryContext() {
  return useContext(SearchFilterQueryContext);
}
