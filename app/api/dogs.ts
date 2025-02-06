'use client';

import {DOGS_ROOT} from "@constants/api";
import {
  TDogSearchResponse,
  TDogID,
  TDogMatch,
  TDog,
  ISearchDogs
} from "@definitions/dogs";

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
      .then(payload => payload.json());

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
}: ISearchDogs): Promise<TDog[] | {error: string}> {
  try {
    const resp: TDogSearchResponse | string = await fetch(`${DOGS_ROOT}/search?from=${from}&size=${size}&sort=${sort}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(payload => {
        if (!payload.ok) {
          return payload.text();
        }

        return payload.json();
     });


    console.log('resp', resp)

    if (typeof resp === "string") {
      return {
        error: resp
      };
    }

    const dogs: TDog[] = await retreiveDogsById(resp.resultIds);

    return dogs;

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
export async function retreiveDogsById(idList: TDogID[]): Promise<TDog[]> {
  try {
    console.log('retreiveDogsById url is:', `${DOGS_ROOT}`)
    const resp = await fetch(`${DOGS_ROOT}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(idList)
    })
      .then(payload => payload.json());

    return resp;

  } catch (err) {
    console.error("Error getting dog breeds:", err);
    return [];
  }
}


/*
 * POST a list of dog IDs to get a single best match
 */
export async function getDogMatchById(idList: TDogID[]): Promise<TDog> {
  try {
    const resp:TDogMatch = await fetch(`${DOGS_ROOT}/match`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({idList})
    })
      .then(payload => payload.json());

    const dog = await retreiveDogsById([resp.match]);

    return dog[0];

  } catch (err) {
    console.error("Error getting dog breeds:", err);
    return {} as TDog;
  }
}
