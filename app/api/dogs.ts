import {DOGS_ROOT} from "@constants/api";
import {
  TDogSearchResponse,
  TDogID,
  TDogMatch,
  TDog
} from "@definitions/dogs";

/*
 * GET list of dog breeds from the remote
 */
export async function getDogBreeds(): Promise<string[]> {
  try {
    const resp = await fetch(`${DOGS_ROOT}/breeds`, {
      method: "GET",
      credentials: "include",
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
export async function searchDogs(): Promise<TDogSearchResponse[]> {
  /**
   * breeds
   * zipCodes
   * ageMin
   * ageMax
   *
   * size
   * from
   * sort
   */
  try {
    const resp = await fetch(`${DOGS_ROOT}/search`, {
      method: "GET",
      credentials: "include",
    })
      .then(payload => payload.json());

    return resp;

  } catch (err) {
    console.error("Error getting dog breeds:", err);
    return [];
  }
}

/*
 * POST a list of dog IDs to get the full record data
 */
export async function retreiveDogsById(idList: TDogID[]): Promise<TDog[]> {
  try {
    const resp = await fetch(`${DOGS_ROOT}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({idList})
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
        "Content-Type": "application/json"
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
