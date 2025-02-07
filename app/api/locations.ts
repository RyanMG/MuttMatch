'use client';

import {LOCATIONS_ROOT} from "@constants/api";
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
    const resp = await fetch(`${LOCATIONS_ROOT}/search`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
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
