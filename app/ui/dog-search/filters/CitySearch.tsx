import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { searchLocations } from "@api/locations";
import {
  TStateAbbr,
  TLocationSearchResponse
} from "@definitions/location";
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";

/**
 *
 */
const buildCityOptions = (results: TLocationSearchResponse['results']): { [key: string]: string[] } => {
  return results
    .reduce((acc, result) => {
      if (acc[result.city]) {
        acc[result.city].push(result.zip_code);
      } else {
        acc[result.city] = [result.zip_code];
      }

      return acc;
    }, {} as { [key: string]: string[] })
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

  const { setZipCodes } = useSearchFilterQueryContext();

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
        const cityOptions = buildCityOptions(resp.results);
        setCityResults(Object.keys(cityOptions));

        setZipCodes(Object.values(cityOptions).flat());
      }
    })();
  }, [stateSelection, inputValue, setZipCodes])

  return (
    <>
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
          renderInput={(params) => <TextField {...params} label="City" />}
        />
      )}
    </>
  );
}
