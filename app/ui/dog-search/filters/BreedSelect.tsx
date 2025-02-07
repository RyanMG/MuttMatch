'use client';

import { ReactNode, SyntheticEvent, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import { getDogBreeds } from "@api/dogs";

export default function BreedSelect({
  breedSelection,
  handleChange,
}: {
  breedSelection: string[] | undefined;
  handleChange: (val: string[]) => void;
}): ReactNode {

  const [breedResults, setBreedResults] = useState<string[]>([] as string[]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (inputValue !== "") {
        const resp = await getDogBreeds();
        if (resp === "Unauthorized") {
          return;
        }
        if ('error' in resp) {
          return;
        }

        setBreedResults(resp);
      }
    })();
  }, [inputValue])

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="w-full">
      <Autocomplete
        disablePortal
        options={breedResults}
        value={""}
        onChange={(event: SyntheticEvent, newValue: string | null) => {
          if (newValue) {
            handleChange(newValue);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event: SyntheticEvent, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Breed" />}
      />
    </FormControl>
  )
}
