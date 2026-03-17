export const POKEMON_API_URL = "https://pokeapi.co/api/v2";
export const INDEX = "寶可夢圖鑑";
export const POKEMON_TYPES = [
  { label: "一般", value: "normal" },
  { label: "草", value: "grass" },
  { label: "火", value: "fire" },
  { label: "水", value: "water" },
  { label: "電", value: "electric" },
  { label: "蟲", value: "bug" },
  { label: "飛行", value: "flying" },
  { label: "岩石", value: "rock" },
  { label: "毒", value: "poison" },
  { label: "地面", value: "ground" },
  { label: "冰", value: "ice" },
  { label: "格鬥", value: "fighting" },
  { label: "超能力", value: "psychic" },
  { label: "幽靈", value: "ghost" },
  { label: "龍", value: "dragon" },
  { label: "惡", value: "dark" },
  { label: "鋼", value: "steel" },
  { label: "妖精", value: "fairy" },
] as const; // 使用 as const 讓 TypeScript 記住精確的字串值

export const POKEMON_REGIONS = [
  { label: "關都地區", value: "kanto" },
  { label: "城都地區", value: "johto" },
  { label: "豐緣地區", value: "hoenn" },
  { label: "神奧地區", value: "sinnoh" },
  { label: "合眾地區", value: "unova" },
  { label: "卡洛斯地區", value: "kalos" },
  { label: "阿羅拉地區", value: "alola" },
  { label: "伽勒爾地區", value: "galar" },
  { label: "洗翠地區", value: "hisui" },
  { label: "帕底亞地區", value: "paldean" },
] as const;

// constants/pokemon.ts
export const POKEMON_SORT_OPTIONS = [
  { label: "圖鑑編號由小至大", value: "id_asc" },
  { label: "圖鑑編號由大至小", value: "id_desc" },
  { label: "重量由輕至重", value: "weight_asc" },
  { label: "重量由重至輕", value: "weight_desc" },
  { label: "身高由低至高", value: "height_asc" },
  { label: "身高由高至低", value: "height_desc" },
] as const;
