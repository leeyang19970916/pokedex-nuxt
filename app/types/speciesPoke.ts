import type { Opt } from "./pokeDetail";
import type { PokeCard } from "./pokemon";

export interface SpeciesPokeOriginalAPIRes {
  base_happiness: number;
  capture_rate: number;
  color: Opt;
  egg_groups: Opt[];
  evolution_chain: { url: Opt["url"] };
  evolves_from_species: Opt;
  flavor_text_entries: {
    flavor_text: string;
    language: Opt;
    version: Opt;
  };
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: {
    genus: string;
    language: Opt;
  }[];
  generation: Opt;
  growth_rate: Opt;
  habitat: Opt;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: PokeCard["id"];
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: PokeCard["name"];
  names: {
    language: Opt;
    name: PokeCard["name"];
  }[];
  order: number;
  pal_park_encounters: {
    area: Opt;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: Opt;
  }[];
  shape: Opt;
  varieties: {
    is_default: boolean;
    pokemon: Opt;
  }[];
}
