import { ReactNode } from "react"
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";

export default function CurrentResultFiltersNotice(): ReactNode {

  const {breeds} = useSearchFilterQueryContext();

  let display: string = "Showing all results. To see more personalized pups, choose from the options above!"

  if (breeds.length) {
    display = "Currently showing results for";

    if (breeds.length) {
      display += ` ${breeds.join(', ')} breeds`;
    }

    // if (ageMin !== 0 || ageMax !== 20) {
    //   display += ` between ${ageMin} and ${ageMax} years old`;
    // }

    display += "."
  }

  return (
    <div className="flex flex-row w-full flex-row items-center justify-center mb-2">
      <p className="italic text-indigo-950 text-sm">{display}</p>
    </div>
  )
}
