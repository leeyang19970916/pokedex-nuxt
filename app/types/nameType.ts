export enum PokemonNameType {
  NORMAL = "normal",
  FIGHTING = "fighting",
  FLYING = "flying",
  POISON = "poison",
  GROUND = "ground",
  ROCK = "rock",
  BUG = "bug",
  GHOST = "ghost",
  STEEL = "steel",
  FIRE = "fire",
  WATER = "water",
  GRASS = "grass",
  ELECTRIC = "electric",
  PSYCHIC = "psychic",
  ICE = "ice",
  DRAGON = "dragon",
  DARK = "dark",
  FAIRY = "fairy",
  STELLAR = "stellar",
  UNKNOWN = "unknown",
}
export interface TypeRes {
  count: number;
  next: string;
  previous: any;
  results: TypeResult[];
}

export interface TypeResult {
  name: PokemonNameType;
  url: string;
}

export interface TypeDetailRes {
  damage_relations: DamageRelations;
  game_indices: Index[];
  generation: Generation2;
  id: number;
  move_damage_class: MoveDamageClass;
  moves: Mfe[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
  sprites: Sprites;
}

export interface DamageRelations {
  double_damage_from: TypeResult[];
  double_damage_to: TypeResult[];
  half_damage_from: TypeResult[];
  half_damage_to: TypeResult[];
  no_damage_from: TypeResult[];
  no_damage_to: TypeResult[];
}

export interface Index {
  game_index: number;
  generation: Generation;
}

export interface Generation {
  name: string;
  url: string;
}

export interface Generation2 {
  name: string;
  url: string;
}

export interface MoveDamageClass {
  name: string;
  url: string;
}

export interface Mfe {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface Pokemon {
  pokemon: Pokemon2;
  slot: number;
}

export interface Pokemon2 {
  name: string;
  url: string;
}

export interface Sprites {
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-ix": GenerationIx;
  "generation-v": GenerationV;
  "generation-vi": GenerationVi;
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}
export type NameIcon = Record<"name_icon", string>;

export interface GenerationIii {
  colosseum: NameIcon;
  emerald: NameIcon;
  "firered-leafgreen": NameIcon;
  "ruby-sapphire": NameIcon;
  xd: NameIcon;
}

export interface GenerationIv {
  "diamond-pearl": NameIcon;
  "heartgold-soulsilver": NameIcon;
  platinum: NameIcon;
}

export interface GenerationIx {
  "scarlet-violet": NameIcon;
}

export interface GenerationV {
  "black-2-white-2": NameIcon;
  "black-white": NameIcon;
}

export interface GenerationVi {
  "omega-ruby-alpha-sapphire": NameIcon;
  "x-y": NameIcon;
}

export interface GenerationVii {
  "lets-go-pikachu-lets-go-eevee": NameIcon;
  "sun-moon": NameIcon;
  "ultra-sun-ultra-moon": NameIcon;
}

export interface GenerationViii {
  "brilliant-diamond-shining-pearl": NameIcon;
  "legends-arceus": NameIcon;
  "sword-shield": NameIcon;
}
