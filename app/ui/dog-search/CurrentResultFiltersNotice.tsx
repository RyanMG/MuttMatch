import { ReactNode } from "react"
import { useSearchParams } from "next/navigation";

export default function CurrentResultFiltersNotice(): ReactNode {

  const searchParams = useSearchParams();

  let display: string = "Showing all results. To see more personalized pups, choose from the options above!"
  const breeds = searchParams.getAll('breeds');

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
