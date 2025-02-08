'use client';

import {
  DOGS_ROOT,
  NUM_RESULTS_PER_PAGE
} from "@constants/api";
import {
  TDogSearchResponse,
  TDogID,
  TDogMatch,
  TDog,
  ISearchDogs,
  TSearchDogsResponse
} from "@definitions/dogs";
import { parsePayload } from "@utils/apiUtils";

const breedsCache: string[] = [];

const filterBreedsBySearchTerm = (breeds: string[], searchTerm?: string, currentSelections: string[] = []): string[] => {
  if (!searchTerm) {
    return breeds
      .slice(0, 10)
      .filter(breed => !currentSelections.includes(breed));
  }

  return breeds
    .filter(breed => !currentSelections.includes(breed) && breed.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10);
}
/*
 * GET list of dog breeds from the remote
 */
export async function getDogBreeds(searchTerm?: string, currentSelections: string[] = []): Promise<string[] | { error: string } | "Unauthorized"> {
  try {
    if (breedsCache.length > 0) {
      return filterBreedsBySearchTerm(breedsCache, searchTerm, currentSelections);
    }

    const resp = await fetch(`${DOGS_ROOT}/breeds?search=${searchTerm}`, {
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

    if ('error' in resp) {
      return resp;
    }

    breedsCache.push(...resp);
    return filterBreedsBySearchTerm(breedsCache, searchTerm, currentSelections);

  } catch (err) {
    console.error("Error getting dog breeds:", err);
    return {
      error: "Error getting dog breeds"
    };
  }
}

/*
 * GET matching results of dogs based on provided query filter
 */
export async function searchDogs({
  breeds,
  // zipCodes,
  ageRange,
  page = 1,
  sort = "breed:asc"
}: ISearchDogs): Promise<TSearchDogsResponse | {error: string} | "Unauthorized"> {

  let filterQuery: string = "";
  if (breeds && breeds.length > 0) {
    filterQuery += breeds.reduce((acc, breed) => acc += `&breeds=${breed.split(' ').join('+')}`, "");
  }

  if (ageRange) {
    filterQuery += `&ageMin=${ageRange[0]}&ageMax=${ageRange[1]}`;
  }

  const from = (page - 1) * NUM_RESULTS_PER_PAGE;

  try {
    const resp: TDogSearchResponse | "Unauthorized" = await fetch(`${DOGS_ROOT}/search?from=${from}&size=${NUM_RESULTS_PER_PAGE}&sort=${sort}${filterQuery}`, {
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

    return {
      dogs: dogsByIdResp,
      total: resp.total
    };

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
