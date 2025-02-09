'use server';

import { ReactNode } from "react";
import PageWrapper from "@ui/common/PageWrapper";
import SearchFiltersWrapper from "@ui/dog-search/SearchFiltersWrapper";
import Divider from "@ui/common/Divider";
import { Suspense } from "react";
import DogSearchResults from "@ui/dog-search/DogSearchResults";
import SearchFilterQueryProvider from "@context/searchFilterQueryProvider";

// FPO
function Loading() {
  return <h2>Loading...</h2>;
}

export default async function SearchDogs(): Promise<ReactNode> {

  return (
    <PageWrapper pageTitle="Search Dogs">
      <Suspense fallback={<Loading />}>
        <SearchFilterQueryProvider>
          <Suspense fallback={<Loading />}>
            <SearchFiltersWrapper />
          </Suspense>

          <Divider />

          <Suspense>
            <DogSearchResults />
          </Suspense>
        </SearchFilterQueryProvider>
      </Suspense>
    </PageWrapper>
  );
}
