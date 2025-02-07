'use client';

import { ReactNode, useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation';
import PageLoading from "@ui/common/PageLoading";
import DogCard from "@ui/dog-search/DogCard";
import CurrentResultFiltersNotice from "@ui/dog-search/CurrentResultFiltersNotice";

import {
  searchDogs
} from "@api/dogs";

import {
  TDog,
  ISearchDogs
} from "@definitions/dogs";

export default function DogSearchResults({
  searchParams
}: {
  searchParams: {
    breeds?: string
    page?: string
  } | undefined
}): ReactNode {
  const query = {} as ISearchDogs;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchResults = useRef<TDog[]>([] as TDog[]);

  if (searchParams) {
    query.from = (Number(searchParams.page) || "1") as ISearchDogs['from'];
    query.breeds = (searchParams.breeds?.split(',') || []) as ISearchDogs['breeds'];
    // query.zipCodes = (Number(searchParams.page) || "1") as ISearchDogs['zipCodes'];
    // query.ageMin = (Number(searchParams.page) || "1") as ISearchDogs['ageMin'];
    // query.ageMax = (Number(searchParams.page) || "1") as ISearchDogs['ageMax'];
    // query.size = (Number(searchParams.page) || "1") as ISearchDogs['size'];
  }

  useEffect(() => {
    (async () => {
      const resp = await searchDogs(query);

      if (resp === "Unauthorized") {
        router.push('/logout');
        return;
      }

      if ('error' in resp) {
        return;
      }

      searchResults.current = resp;
      setIsLoading(false);
    })();
  }, [query]);

  return (
    <>
      {isLoading && <PageLoading />}
      {!isLoading &&
        <>
          <CurrentResultFiltersNotice queryOptions={query} />
          <div className="flex flex-wrap overflow-scroll no-scrollbar">
            {searchResults.current.map((result: TDog) => <DogCard key={result.id} dog={result} />)}
          </div>
      </>
      }
    </>
  )
}