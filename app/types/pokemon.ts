import { POKEMON_TYPES, POKEMON_REGIONS } from "~/constants";
export type Id = number;
export type Url = string;
export type PokeType = (typeof POKEMON_TYPES)[number]["value"];
export type PokeRegion = (typeof POKEMON_REGIONS)[number]["value"];
export type PokeCard = {
  id: Id;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: PokeType[];
  ability: any[];
  stats: any[];
};
