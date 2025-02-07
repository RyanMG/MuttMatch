import TextField from "@mui/material/TextField";
import Modal from '@ui/common/Modal';
import SearchByLocationModalContent from "./SearchByLocationModalContent";

import {
  TStateAbbr
} from "@definitions/location";

import { ReactNode, useEffect, useState } from "react";

export default function SearchByLocation({
  handleChange
}: {
  handleChange: (city : string, state: TStateAbbr) => void;
}): ReactNode {

  const [showLocationModal, setShowLocationModal] = useState<boolean>(false)
  const [state, setState] = useState<TStateAbbr>("" as TStateAbbr)
  const [citySelection, setCitySelection] = useState<string>("")

  useEffect(() => {
    if (!citySelection) return
    handleChange(citySelection, state)
  }, [citySelection])

  return (
    <div>
      <TextField
        placeholder="Cities to search"
        name="cities"
        size="small"
        defaultValue={citySelection}
        onClick={() => setShowLocationModal(true)}
      />
      <Modal
        open={showLocationModal}
        closeModal={() => setShowLocationModal(false)}
        title="Search By City"
      >
        <SearchByLocationModalContent
          state={state}
          citySelection={citySelection}
          setState={setState}
          setCitySelection={setCitySelection}
          setShowLocationModal={setShowLocationModal}
        />
      </Modal>
    </div>
  )
}
