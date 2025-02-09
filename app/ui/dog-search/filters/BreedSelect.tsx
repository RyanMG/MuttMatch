'use client';

import { ReactNode, SyntheticEvent, useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";

import { getDogBreeds } from "@api/dogs";
import { useDebouncedCallback } from 'use-debounce';
import {useSearchFilterQueryContext} from "@context/searchFilterQueryProvider"

export default function BreedSelect(): ReactNode {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const {setBreeds, breeds} = useSearchFilterQueryContext();

  const searchBreedsDebounced = useDebouncedCallback(async (searchTerm: string) => {
    const resp = await getDogBreeds(searchTerm, breeds);
    if (resp === "Unauthorized") {
      return;
    }
    if ('error' in resp) {
      return;
    }

    setSearchResults(resp);
  }, 500);

  /**
   * User chooses a new breed from the list
   */
  const handleBreedSelection = (breed: string) => {
    setBreeds([
      ...breeds,
      breed
    ]);

    setSearchTerm("");
    searchBreedsDebounced(searchTerm);
  }

  return (
    <section className="flex flex-col">

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="w-full">
        <Autocomplete
          disablePortal
          size="small"
          options={searchResults}
          value={""}
          onChange={(event: SyntheticEvent, newValue: string | null) => {
            if (newValue) {
              handleBreedSelection(newValue);
            }
          }}
          inputValue={searchTerm}
          onFocus={() => {
            searchBreedsDebounced.cancel();
            searchBreedsDebounced(searchTerm);
          }}
          onInputChange={(event: SyntheticEvent, newInputValue) => {
            searchBreedsDebounced.cancel();
            setSearchTerm(newInputValue);
            searchBreedsDebounced(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Breed" />}
        />
      </FormControl>
    </section>
  )
}
