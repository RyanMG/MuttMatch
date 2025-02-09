import { ReactNode } from "react"
import { useSearchParams } from "next/navigation";

export default function CurrentResultFiltersNotice(): ReactNode {

  const searchParams = useSearchParams();

  let display: string = "Showing all results. To see more personalized pups, choose from the options above!"
  const breeds = searchParams.getAll('breeds');
  const minAge = Number(searchParams.get('minAge') || 0);
  const maxAge = Number(searchParams.get('maxAge') || 15);
  const city = searchParams.get('city') || "";
  const state = searchParams.get('state') || "";

  if (breeds.length || (minAge !== 0 || maxAge !== 15 || city)) {
    display = `Currently showing results ${breeds.length || (minAge !== 0 || maxAge !== 15) ? " for" : ""}`;

    if (breeds.length) {
      display += ` ${breeds.join(', ')} breeds`;
    }
    if (minAge !== 0 || maxAge !== 15) {
      display += ` between ${minAge} and ${maxAge} years old`;
    }
    if (city) {
      display += ` in ${city}`;
      if (state) {
        display += `, ${state}`;
      }
    }

    display += "."
  }

  return (
    <div className="flex flex-row w-full flex-row items-center justify-center mb-2">
      <p className="italic text-indigo-950 text-sm">{display}</p>
    </div>
  )
}
