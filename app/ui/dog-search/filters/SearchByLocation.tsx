import Modal from '@ui/common/Modal';
import SearchByLocationModalContent from "./SearchByLocationModalContent";
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";
import { ReactNode, useState } from "react";

export default function SearchByLocation(): ReactNode {

  const [showLocationModal, setShowLocationModal] = useState<boolean>(false)
  const {
    state,
    city
  } = useSearchFilterQueryContext();

  const textFieldDefault = city && state ? `${city}, ${state}` : "Cities to search";

  return (
    <>
      <div className="h-10 border border-gray-400 rounded-md m-2 flex items-center cursor-pointer" onClick={() => setShowLocationModal(true)}>
        <p className="text-md text-gray-500 pl-3 select-none">{textFieldDefault}</p>
      </div>

      <Modal
        open={showLocationModal}
        closeModal={() => setShowLocationModal(false)}
        title="Search By City"
      >
        <SearchByLocationModalContent
          setShowLocationModal={setShowLocationModal}
        />
      </Modal>
    </>
  )
}
