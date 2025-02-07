'use client';

import {DOGS_ROOT} from "@constants/api";
import {
  TDogSearchResponse,
  TDogID,
  TDogMatch,
  TDog,
  ISearchDogs
} from "@definitions/dogs";
import { parsePayload } from "@utils/apiUtils";

/*
 * GET list of dog breeds from the remote
 */
export async function getDogBreeds(): Promise<string[]> {
  try {
    const resp = await fetch(`${DOGS_ROOT}/breeds`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(parsePayload);

    return resp;

  } catch (err) {
    console.error("Error getting dog breeds:", err);
    return [];
  }
}

/*
 * GET matching results of dogs based on provided query filter
 */
export async function searchDogs({
  // breeds,
  // zipCodes,
  // ageMin,
  // ageMax,
  size = 10,
  from = 1,
  sort = "breed:asc"
}: ISearchDogs): Promise<TDog[] | {error: string} | "Unauthorized"> {
  try {
    const resp: TDogSearchResponse | "Unauthorized" = await fetch(`${DOGS_ROOT}/search?from=${from}&size=${size}&sort=${sort}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(parsePayload);

    if (resp === "Unauthorized") {
      return "Unauthorized";
    }

    const dogsByIdResp: TDog[] | {error: string} | "Unauthorized" = await retreiveDogsById(resp.resultIds!);

    if (dogsByIdResp === "Unauthorized") {
      return "Unauthorized";
    }

    if ('error' in dogsByIdResp) {
      return dogsByIdResp;
    }

    return dogsByIdResp;

  } catch (err) {
    console.error("Error getting dog breeds:", err);
    return {
      error: "Error getting dog breeds"
    }
  }
}

/*
 * POST a list of dog IDs to get the full record data
 */
export async function retreiveDogsById(idList: TDogID[]): Promise<TDog[] | {error: string} | "Unauthorized"> {
  try {
    const resp = await fetch(`${DOGS_ROOT}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(idList)
    })
      .then(parsePayload);

    return resp;

  } catch (err) {
    console.error("Error getting dogs by ID list:", err);
    return {
      error: "Error getting dogs"
    };
  }
}

/*
 * POST a single dog ID to get its data
 */
export async function getDogById(id: TDogID): Promise<TDog | { error: string } | "Unauthorized"> {
  try {
    const resp = await retreiveDogsById([id]);

    if (resp === "Unauthorized") {
      return "Unauthorized";
    }

    if (!resp || 'error' in resp) {
      return {
        error: "Dog not found for the provided ID"
      }
    }
    return resp[0];

  } catch (err) {
    console.error("Error getting dog:", err);
    return {
      error: "Error getting dog"
    };
  }
}

/*
 * POST a list of dog IDs to get a single best match
 */
export async function getDogMatchById(idList: TDogID[]): Promise<TDog | { error: string } | "Unauthorized"> {
  try {
    const resp:TDogMatch | "Unauthorized" = await fetch(`${DOGS_ROOT}/match`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({idList})
    })
      .then(parsePayload);

    if (resp === "Unauthorized") {
      return "Unauthorized";
    }

    const dogResponse = await retreiveDogsById([resp.match]);
    if (dogResponse === "Unauthorized") {
      return "Unauthorized";
    }

    if ('error' in dogResponse) {
      return dogResponse;
    }

    return dogResponse[0];

  } catch (err) {
    console.error("Error getting dog matches:", err);
    return {
      error: "Error getting dog matches"
    };
  }
}
