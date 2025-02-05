import { ReactNode } from "react";
import PageWrapper from "@ui/common/PageWrapper";
import Searchbar from "@ui/common/Searchbar";

export default function SearchDogs(): ReactNode {
  return (
    <PageWrapper pageTitle="Search Dogs">
      <Searchbar />
    </PageWrapper>
  );
}
