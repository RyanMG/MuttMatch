import { ReactNode } from "react";
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";
import Chip from "@mui/material/Chip";

export default function BreedSelections(): ReactNode {
  const {setBreeds, breeds} = useSearchFilterQueryContext();

  /**
   * User removes a breed from the list
   */
  const handleBreedRemoval = (breed: string) => {
    setBreeds(
      breeds.filter(b => b !== breed)
    )
  }

  return (
    <div className="flex flex-row flex-wrap py-2">
      {breeds.map(breed => (
        <div key={breed} className="pr-1">
          <Chip label={breed} variant="outlined" onDelete={() => {
            handleBreedRemoval(breed);
          }} />
        </div>
      ))}
    </div>
  )
}
