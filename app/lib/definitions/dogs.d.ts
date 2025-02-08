type TDogID = string;

export type TDogSearchResponse = {
  next: string | null,
  prev: string | null,
  resultIds: TDogID[],
  total: number
}

export type TSearchDogsResponse = {
  dogs: TDog[]
  total: number
}

export type TDog = {
    id: TDogID
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export type TDogMatch = {
    match: TDogID
}

export interface ISearchDogs {
  breeds?: string[];
  zipCodes?: string[];
  ageRange?: number[];
  page?: number;
  sort?: string;
}
