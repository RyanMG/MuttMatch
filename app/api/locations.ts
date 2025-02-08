'use client';

import {
  LOCATIONS_ROOT,
  HEADERS
} from "@constants/api";
import {
  TStateAbbr,
  TLocationSearchResponse
} from "@definitions/location";

import { parsePayload } from "@utils/apiUtils";

export async function searchLocations({
  state,
  citySearchTerm
}: {
  state: TStateAbbr;
  citySearchTerm: string;
}): Promise<TLocationSearchResponse | {error: string} | "Unauthorized"> {
  try {
    const resp: TLocationSearchResponse | "Unauthorized" = await fetch(`${LOCATIONS_ROOT}/search`, {
      method: "POST",
      credentials: "include",
      headers: HEADERS,
      body: JSON.stringify({
        "states": [state],
        "city": citySearchTerm
      })
    })
      .then(parsePayload);

    if (resp === "Unauthorized") {
      return "Unauthorized";
    }

    return resp;

  } catch (error) {
    console.log(error);
    return {
      error: "Error searching locations"
    };
  }
}

export async function getZipCodesByLocation({
  city,
  state
}: {
  city: string;
  state: TStateAbbr;
}): Promise<string[] | {error: string} | "Unauthorized"> {
  try {
    const resp: TLocationSearchResponse | "Unauthorized" = await fetch(`${LOCATIONS_ROOT}/search`, {
      method: "POST",
      credentials: "include",
      headers: HEADERS,
      body: JSON.stringify({
        "states": [state],
        "city": city
      })
    })
      .then(parsePayload);

    if (resp === "Unauthorized") {
      return "Unauthorized";
    }

    return resp.results.map((loc) => loc.zip_code);

  } catch (error) {
    console.log(error);
    return {
      error: "Error searching locations"
    };
  }
}

/**
 * Get city data by a list of zip codes
 */
export async function fetchCityByZipCode(zipCode: string[]): Promise<string | {error: string} | "Unauthorized"> {
  try {
    const resp = await fetch(`${LOCATIONS_ROOT}`, {
      method: "POST",
      credentials: "include",
      headers: HEADERS,
      body: JSON.stringify(zipCode)
    })
      .then(parsePayload);

    if (resp === "Unauthorized") {
      return "Unauthorized";
    }

    return resp;

  } catch (error) {
    console.log(error);
    return {
      error: "Error fetching city"
    };
  }
}
