'use server';

import { ReactNode } from "react";
import PageWrapper from "@ui/common/PageWrapper";
import SearchFilters from "@ui/dog-search/SearchFilters";
import { Suspense } from "react";
import DogSearchResults from "@ui/dog-search/DogSearchResults";

// FPO
function Loading() {
  return <h2>Loading...</h2>;
}

export default async function SearchDogs({
  searchParams
}: {
  searchParams: Promise<{
    query?: string
    page?: string
  }> | undefined
}): Promise<ReactNode> {

  const params = await searchParams;

  return (
    <PageWrapper pageTitle="Search Dogs">
      <Suspense fallback={<Loading />}>
        <SearchFilters />
      </Suspense>

      <Suspense>
        <DogSearchResults searchParams={params} />
      </Suspense>
    </PageWrapper>
  );
}
