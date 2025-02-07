import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { searchLocations } from "@api/locations";
import {
  TStateAbbr,
  TLocationSearchResponse
} from "@definitions/location";

/**
 *
 */
const buildCityOptions = (results: TLocationSearchResponse['results']): string[] => {
  const citiesMap = results
    .reduce((acc, result) => {
      if (acc[result.city]) {
        acc[result.city].push(result.zip_code);
      } else {
        acc[result.city] = [result.zip_code];
      }

      return acc;
    }, {} as { [key: string]: string[] })

    return Object.keys(citiesMap);
}

/**
 *
 */
export default function CitySearch({
  citySelection,
  stateSelection,
  handleChange
}: {
  citySelection: string;
  stateSelection: TStateAbbr;
  handleChange: (value: string) => void;
}): ReactNode {
  const [cityResults, setCityResults] = useState<string[]>([] as string[]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (stateSelection !== "" as TStateAbbr && inputValue !== "") {
        const resp = await searchLocations({
          state: stateSelection,
          citySearchTerm: inputValue
        });
        if (resp === "Unauthorized") {
          return;
        }
        if ('error' in resp) {
          return;
        }

        setCityResults(buildCityOptions(resp.results));
      }
    })();
  }, [stateSelection, inputValue])

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="w-full">
      {stateSelection === "" as TStateAbbr && (
        <Autocomplete
          disablePortal
          disabled
          options={[]}
          sx={{
            height: 50,
            width: 300
          }}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
      )}
      {stateSelection !== "" as TStateAbbr && (
        <Autocomplete
          disablePortal
          options={cityResults}
          value={citySelection}
          onChange={(event: SyntheticEvent, newValue: string | null) => {
            if (newValue) {
              handleChange(newValue);
            }
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          sx={{
            height: 50,
            width: 300
          }}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
      )}
    </FormControl>

  );
}
