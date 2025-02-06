'use server';

import { ReactNode } from "react";
import PageWrapper from "@ui/common/PageWrapper";
import Searchbar from "@ui/common/Searchbar";
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

  return (
    <PageWrapper pageTitle="Search Dogs">
      <Suspense fallback={<Loading />}>
        <Searchbar />
      </Suspense>

      <Suspense>
        <DogSearchResults searchParams={searchParams} />
      </Suspense>
    </PageWrapper>
  );
}
