import type { Opt } from "./pokeDetail";
export type PokeAbilityOriginalAPIRes = {
  effect_changes: EffectChange[];
  effect_entries: EffectEntry2[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Opt;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
};

export interface EffectChange {
  effect_entries: EffectEntry[];
  version_group: Opt;
}

export interface EffectEntry {
  effect: string;
  language: Opt;
}
export interface EffectEntry2 {
  effect: string;
  language: Opt;
  short_effect: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Opt;
  version_group: Opt;
}

export interface Name {
  language: Opt;
  name: string;
}

export interface Pokemon {
  x?: boolean;
  pokemon: Opt;
  slot: number;
  is_hidden?: boolean;
}
