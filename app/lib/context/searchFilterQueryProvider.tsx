'use client';

import {createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState, RefObject} from "react";
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
  applyFilters: () => void;
  breeds: RefObject<string[]> | null;
  setBreeds: (breedList: string[]) => void;
  searchResults: RefObject<TDog[]> | null;
  resultsLoading: boolean;
  totalResults: RefObject<number> | null;
}>({
  query: null,
  applyFilters: () => null,
  breeds: null,
  setBreeds: () => null,
  searchResults: null,
  resultsLoading: false,
  totalResults: null
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
  const searchResults = useRef<TDog[]>([] as TDog[]);
  const totalResults = useRef<number>(0);

  const [resultsLoading, setResultsLoading] = useState<boolean>(true);

  const breeds = useRef<string[]>(initialBreeds ? initialBreeds : []);

  const query = useRef<URLSearchParams>(new URLSearchParams(initialSearchParams));

  const setBreeds = (breedList: string[]) => {
    breeds.current = breedList;
  }

  /**
   * Apply the currently selected filter into the URL params
   */
  const applyFilters = useCallback(async () => {
    const params = query.current;
    params.set('page', '1');

    params.delete('breeds');

    if (breeds.current) {
      breeds.current.forEach(breed => params.append('breeds', breed))
    }

    // if (city && state) {
    //   params.set('city', `${city}`)
    //   params.set('state', `${state}`)
    // } else {
    //   params.delete('city');
    //   params.delete('state');
    // }

    // if (minAge) params.set('minAge', `${minAge}`)
    // else params.delete('minAge');
    // if (maxAge) params.set('maxAge', `${maxAge}`)
    // else params.delete('maxAge');

    router.replace(`${pathname}?${params.toString()}`);
    query.current = new URLSearchParams(params);
    fetchSearchResults();
  }, [query, breeds]);

  const fetchSearchResults = useCallback(async () => {
    setResultsLoading(true);
    const resp = await searchDogs({
      breeds: breeds?.current
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
  }, [breeds])

  useEffect(() => {
    fetchSearchResults();
  }, [])

  return (
    <SearchFilterQueryContext.Provider
      value={{
        query,
        applyFilters,
        breeds,
        setBreeds,
        searchResults,
        resultsLoading,
        totalResults
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
