'use server';

import { ReactNode } from "react"
import { redirect } from 'next/navigation';
import {
  searchDogs
} from "@api/dogs";

import {
  ISearchDogs
} from "@definitions/dogs";

export default async function DogSearchResults({
  searchParams
}: {
  searchParams: Promise<{
    query?: string
    page?: string
  }> | undefined
}): Promise<ReactNode> {
  const params = await searchParams;
  const query = {} as ISearchDogs;

  if (params) {
    query.from = (Number(params.page) ?? "1") as ISearchDogs['from'];
  }

  const searchResults = await searchDogs(query);

  if ('error' in searchResults) {
    if (searchResults.error === "Unauthorized") {
      redirect('/logout');
    }
    return;
  }

  return (
    <div>
      <h1>Search Results</h1>
      {searchResults && searchResults.map(result => (
        <div key={result.id}>
          <p>{result.name}</p>
          <p>{result.breed}</p>
        </div>
      ))}
    </div>
  )
}