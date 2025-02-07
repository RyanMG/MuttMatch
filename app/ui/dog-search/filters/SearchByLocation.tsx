import TextField from "@mui/material/TextField";
import Modal from '@ui/common/Modal';
import SearchByLocationModalContent from "./SearchByLocationModalContent";

import {
  TStateAbbr
} from "@definitions/location";

import { ReactNode, useState } from "react";

// city - the full or partial name of a city
// states - an array of two-letter state/territory abbreviations
// geoBoundingBox - an object defining a geographic bounding box:
//     This object must contain one of the following combinations of properties:
//         top, left, bottom, right
//         bottom_left, top_right
//         bottom_right, top_left
//     Each property should have the following data:
//         lat - latitude
//         lon - longitude

export default function SearchByLocation(): ReactNode {
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false)
  const [state, setState] = useState<TStateAbbr>("" as TStateAbbr)
  const [citySelection, setCitySelection] = useState<string>("")

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
