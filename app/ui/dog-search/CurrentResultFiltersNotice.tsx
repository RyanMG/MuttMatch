import { ReactNode } from "react"
import {
  ISearchDogs
} from "@definitions/dogs";

export default function CurrentResultFiltersNotice({
  queryOptions
}: {
  queryOptions: ISearchDogs
}): ReactNode {
  console.log('queryOptions', queryOptions);
  const {
    breeds = [],
    zipCodes = [],
    ageMin = 0,
    ageMax = 20
  } = queryOptions;

  let display: string = "Showing all results. To see more personalized pups, choose from the options above!"

  if (breeds?.length > 0 || zipCodes?.length > 0 || ageMin !== 0 || ageMax !== 20) {
    display = "Currently showing results for";

    if (breeds.length) {
      display += ` ${breeds.join(', ')} breeds`;
    }

    if (ageMin !== 0 || ageMax !== 20) {
      display += ` between ${ageMin} and ${ageMax} years old`;
    }

    display += "."
  }


  return (
    <div className="flex flex-row w-full flex-row items-center justify-center mb-2">
      <p className="italic text-indigo-950 text-sm">{display}</p>
    </div>
  )
}
