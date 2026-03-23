import {
  POKEMON_TYPES,
  POKEMON_REGIONS,
  POKEMON_SORT_OPTIONS,
} from "~/constants";
export type Id = number;
export type Url = string;
export type PokeType = (typeof POKEMON_TYPES)[number]["value"];
export type PokeRegion = (typeof POKEMON_REGIONS)[number]["value"];
export type PokeSort = (typeof POKEMON_SORT_OPTIONS)[number]["value"];
export type PokeCard = {
  id: Id;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: PokeType[];
  abilities: string[];
  stats: Record<string, any>;
  region: string;
};
export type PokeListQuery = {
  limit: number;
  offset: number;
  searchForm: any;
  sort: PokeSort;
};
