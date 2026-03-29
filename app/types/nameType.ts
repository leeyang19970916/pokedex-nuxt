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
