import { POKEMON_TYPES, POKEMON_REGIONS } from "~/constants";
export type Url = string;
export type PokeType = (typeof POKEMON_TYPES)[number]["value"];
export type PokeRegion = (typeof POKEMON_REGIONS)[number]["value"];
export type PokeListRes = {
  count: number;
  next: Url | null;
  previous: Url | null;
  results: { name: string; url: Url }[];
};
export type PokeCard = {
  id: number;
  name: string;
  image: string;
  types: PokeType[];
};
