'use client';

import { ReactNode, useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation';
import PageLoading from "@ui/common/PageLoading";
import DogCard from "@ui/dog-search/DogCard";

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
    query?: string
    page?: string
  } | undefined
}): ReactNode {
  const query = {} as ISearchDogs;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchResults = useRef<TDog[]>([] as TDog[]);

  if (searchParams) {
    query.from = (Number(searchParams.page) || "1") as ISearchDogs['from'];
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
  }, [searchParams]);

  return (
    <div className="overflow-hidden">
      {isLoading && <PageLoading />}
      {!isLoading &&
        <div className="flex flex-wrap overflow-scroll">
          {searchResults.current.map((result: TDog) => <DogCard key={result.id} dog={result} />)}
        </div>
      }

    </div>
  )
}