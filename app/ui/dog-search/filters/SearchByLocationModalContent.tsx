import { ReactNode } from "react"
import Button from "@ui/common/Button";

import SelectState from "./StateSelect";
import CitySearch from "./CitySearch"
import {
  TStateAbbr
} from "@definitions/location";
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider"

export default function SearchByLocationModalContent({
  setShowLocationModal
}: {
  setShowLocationModal: (value: boolean) => void;
}): ReactNode {

  const {
    state,
    setState,
    city,
    setCity
  } = useSearchFilterQueryContext();

  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="w-1/2">
          <SelectState
            stateSelection={state}
            handleChange={(val: TStateAbbr) => setState(val)}
          />
        </div>
        <div className="w-1/2">
          <CitySearch
            citySelection={city}
            stateSelection={state}
            handleChange={(val: string) => {
              setCity(val)
            }}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-2">
        <Button
          theme="secondary"
          type="button"
          disabled={false}
          onClick={() => setShowLocationModal(false)}
        >
          Cancel
        </Button>

        <Button
          theme="primary"
          type="button"
          disabled={false}
          onClick={() => setShowLocationModal(false)}
        >
          Search by this city.
        </Button>
      </div>
    </>
  )
}
