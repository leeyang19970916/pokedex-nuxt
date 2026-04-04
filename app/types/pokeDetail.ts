import type {
  Id,
  PokeCard,
  PokeType,
  PokeMoveCats,
  PokeRegion,
} from "./pokemon";
import type { PokeDemageRecord } from "./pokeTypeDetail";

export type Opt = {
  name: string;
  url: string;
};
export interface PokeDetailRes {
  id: PokeCard["id"];
  name: PokeCard["name"];
  enName: PokeCard["enName"];
  weight: PokeCard["weight"];
  height: PokeCard["height"];
  types: PokeCard["types"];
  image: PokeCard["image"];
  abilities: PokeCard["abilities"];
  moves: {
    name: PokeCard["name"];
    enName: PokeCard["name"];
    type: PokeType;
    category: PokeMoveCats;
    power: string;
    accuracy: string;
    pp: string;
  }[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  entryText: string;
  varieties: {
    id: PokeCard["id"];
    image: PokeCard["image"];
    name: PokeCard["name"];
  }[];
  evolutionChains: {
    id: Id;
    stage: 1 | 2 | 3;
  }[];
  genus: string;
  damageType: PokeDemageRecord;
  region: PokeRegion;
}

export interface PokemonOriginalAPIRes {
  id: Id;
  name: PokeCard["name"];
  abilities: Abilitiy[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: Opt[];
  game_indices: GameIndex[];
  species: Opt;
  height: PokeCard["height"];
  held_items: any[];
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  order: number;
  past_abilities: {
    abilities: Abilitiy[];
    generation: Opt;
  }[];
  past_stats: {
    generation: Opt;
    stats: Stat[];
  }[];
  past_types: any[];
  sprites: Sprite;
  stats: Stat[];
  types: Type[];
  weight: PokeCard["weight"];
}

type Abilitiy = {
  ability: Opt;
  is_hidden: boolean;
  slot: number;
};
type GameIndex = {
  game_index: number;
  version: Opt;
};
type Move = {
  move: Opt;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: Opt;
    order: null;
    version_group: Opt;
  };
};
type Stat = {
  base_stat: number;
  effort: number;
  stat: Opt;
};
type Sprite = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: Other;
  versions: any;
};
type Other = {
  dream_world: { front_default: string; front_female: any };
  home: {
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  "official-artwork": {
    front_default: string;
    front_shiny: string;
  };

  showdown: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
};
type Type = {
  slot: number;
  type: Opt;
};
