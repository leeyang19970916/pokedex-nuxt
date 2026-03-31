import type { InjectionKey } from "vue";
import {
  POKEMON_TYPES,
  POKEMON_REGIONS,
  POKEMON_SORT_OPTIONS,
  REGION,
  TYPE,
} from "~/constants";
export type Id = number;
export type Url = string;
export type PokeType = (typeof POKEMON_TYPES)[number]["value"];
export type PokeRegion = (typeof POKEMON_REGIONS)[number]["value"];
export type PokeSort = (typeof POKEMON_SORT_OPTIONS)[number]["value"];
export type PokeCard = {
  id: Id;
  name: string;
  enName: string;
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
  searchForm: PokeSearchForm;
  sort: PokeSort;
};
export type PokeAbility = {
  label: string;
  value: string | undefined;
  id: Id;
};
export type PokeSearchForm = {
  keywords: string;
  ids: [Id, Id];
  types: PokeType[];
  regions: PokeRegion[];
  ability: PokeAbility["value"];
};

export const SearchContextKey: InjectionKey<{
  tempForm: Ref<PokeSearchForm>;
  searchForm: Ref<PokeSearchForm>;
  search: () => void;
  revert: () => void;
  clear: () => void;
}> = Symbol("SearchContext");

export type TagPayload = {
  option: (typeof POKEMON_TYPES)[number] | (typeof POKEMON_REGIONS)[number];
  type: typeof TYPE | typeof REGION;
};

export type QueryFormat = {
  limit: PokeListQuery["limit"];
  offset: PokeListQuery["offset"];
  sort: PokeListQuery["sort"];
  keywords?: PokeSearchForm["keywords"];
  types?: PokeSearchForm["types"];
  regions?: PokeSearchForm["regions"];
  ability?: PokeSearchForm["ability"];
  maxId?: PokeSearchForm["ids"][1];
  minId?: PokeSearchForm["ids"][0];
};
