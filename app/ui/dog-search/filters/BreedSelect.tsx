'use client';

import { ReactNode } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function BreedSelect({
  breedSelection,
  handleChange,
}: {
  breedSelection: string;
  handleChange: (event: SelectChangeEvent) => void;
}): ReactNode {

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="w-full">
      <InputLabel id="dogBreed">Breed</InputLabel>
      <Select
          labelId="dogBreed"
          id="dogBreed"
          value={breedSelection}
          label="Breed"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
    </FormControl>
  )
}
