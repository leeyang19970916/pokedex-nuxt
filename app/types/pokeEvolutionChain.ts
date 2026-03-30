import type { Opt } from "./pokeDetail";
import type { Id } from "./pokemon";

export type PokeEvolutionChainRes = {
  baby_trigger_item: any;
  chain: {
    evolution_details: EvolutionDetail[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: Opt;
  };
  id: Id;
};
export interface EvolvesTo {
  evolution_details: PokeEvolutionChainRes["chain"]["evolution_details"];
  evolves_to: PokeEvolutionChainRes["chain"]["evolves_to"];
  is_baby: PokeEvolutionChainRes["chain"]["is_baby"];
  species: PokeEvolutionChainRes["chain"]["species"];
}

export interface EvolutionDetail {
  base_form_id: any;
  gender: any;
  held_item: any;
  item: any;
  known_move: any;
  known_move_type: any;
  location: any;
  min_affection: any;
  min_beauty: any;
  min_damage_taken: any;
  min_happiness: any;
  min_level: number;
  min_move_count: any;
  min_steps: any;
  needs_multiplayer: boolean;
  needs_overworld_rain: boolean;
  party_species: any;
  party_type: any;
  region_id: any;
  relative_physical_stats: any;
  time_of_day: string;
  trade_species: any;
  trigger: any;
  turn_upside_down: boolean;
  used_move: any;
}
