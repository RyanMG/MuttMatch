export type TCoordinates = {
  lat: number;
  lon: number;
}

export type TStateOption = {
  id: TStateAbbr;
  label: string;
}

export type TLocationSearchResponse = {
  results: TCity[];
  total: number;
}

export type TCity = {
  city: string,
  latitude: TCoordinates['lat'],
  county: string,
  state: TStateAbbr,
  zip_code: string,
  longitude: TCoordinates['lon']
}

export type TStateAbbr =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "DC"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "PR"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY"