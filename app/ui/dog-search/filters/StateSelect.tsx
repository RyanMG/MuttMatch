'use client';

import { ReactNode, SyntheticEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {STATE_OPTIONS,} from "@constants/states";
import {
  TStateOption,
  TStateAbbr
} from "@definitions/location";

export default function StateSelect({
  stateSelection,
  handleChange,
}: {
  stateSelection: TStateAbbr;
  handleChange: (value: TStateAbbr) => void;
}): ReactNode {

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) => {
        return option.label || "Choose a state";
      }}
      value={{
        id: stateSelection,
        label: STATE_OPTIONS.find((state) => state.id === stateSelection)?.label || ""
      }}
      onChange={(event: SyntheticEvent, newValue: TStateOption | null) => {
        if (newValue) {
          handleChange(newValue.id as TStateAbbr);
        }
      }}
      options={STATE_OPTIONS}
      renderInput={(params) => <TextField {...params} label="State" />}
    />
  )
}
