import { POKEMON_API_URL } from "~/constants";
import type { PokemonDetailAPIRes } from "~/types/pokeDetail";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const url = `${POKEMON_API_URL}/pokemon/${id}`;
    const res: PokemonDetailAPIRes = await $fetch(url);
    const stats = formattedStat(res.stats);
    const result = {
      id: res.id,
      name: res.name,
      height: res.height,
      weight: res.weight,
      types: res.types.map((t) => t.type.name),
      image: res.sprites.other["official-artwork"].front_default,
      abilities: res.abilities.map((a) => a.ability.name),
      stats,
      moves: res.moves,
    };

    return result;
  } catch (e) {
    throw createError({
      message: "get pokemonDetail is error",
      status: 500,
    });
  }
});
const formattedStat = (stats: PokemonDetailAPIRes["stats"]) => {
  const statsMap = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  stats.forEach((s: PokemonDetailAPIRes["stats"][number]) => {
    if (s.stat.name === "hp") statsMap.hp = s.base_stat;
    if (s.stat.name === "attack") statsMap.atk = s.base_stat;
    if (s.stat.name === "defense") statsMap.def = s.base_stat;
    if (s.stat.name === "special-attack") statsMap.spa = s.base_stat;
    if (s.stat.name === "special-defense") statsMap.spd = s.base_stat;
    if (s.stat.name === "speed") statsMap.spe = s.base_stat;
  });

  return statsMap;
};
