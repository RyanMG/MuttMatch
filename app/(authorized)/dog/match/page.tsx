import { ReactNode } from "react";
import PageWrapper from "@ui/common/PageWrapper";
import DogMatchResults from "@ui/dog/DogMatchResults";

export default function DogMatch(): ReactNode {
  return (
    <PageWrapper pageTitle="Your Dog Match!">
      <DogMatchResults />
    </PageWrapper>
  )
}
