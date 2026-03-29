import type { TypeResult } from "./nameType";
import type { Id, PokeAbility, PokeCard } from "./pokemon";

export interface PokeDetailRes {
  id: Id;
  name: PokeCard["name"];
  abilities: Abilitiy[]; //能力
  base_experience: number; //起始經驗？
  cries: {
    latest: string;
    legacy: string;
  }; //叫聲，不確定可以怎麼用
  forms: TypeResult[]; //不曉得幹嘛的，好像是本人
  game_indices: GameIndex[]; //???遊戲？
  height: PokeCard["height"];
  held_items: any[];
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  order: number;
  past_abilities: {
    abilities: Abilitiy[];
    generation: TypeResult;
  }[];
  past_stats: {
    generation: TypeResult;
    stats: Stat[];
  }[];
  past_types: any[];
  species: TypeResult;
  sprites: Sprite[];
  stats: Stat[];
  types: Type[];
  weight: PokeCard["weight"];
}

type Abilitiy = {
  ability: TypeResult;
  is_hidden: boolean;
  slot: number;
};
type GameIndex = {
  game_index: number;
  version: TypeResult;
};
type Move = {
  move: TypeResult;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: TypeResult;
    order: null;
    version_group: TypeResult;
  };
};
type Stat = {
  base_stat: number;
  effort: number;
  stat: TypeResult;
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
  type: TypeResult;
};
