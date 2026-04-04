import type { PokemonOriginalAPIRes } from "~/types/pokeDetail";
export const formattedStat = (stats: PokemonOriginalAPIRes["stats"]) => {
  const statsMap = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  stats.forEach((s) => {
    if (s.stat.name === "hp") statsMap.hp = s.base_stat;
    if (s.stat.name === "attack") statsMap.atk = s.base_stat;
    if (s.stat.name === "defense") statsMap.def = s.base_stat;
    if (s.stat.name === "special-attack") statsMap.spa = s.base_stat;
    if (s.stat.name === "special-defense") statsMap.spd = s.base_stat;
    if (s.stat.name === "speed") statsMap.spe = s.base_stat;
  });
  return statsMap;
};
