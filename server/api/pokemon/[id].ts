import { POKEMON_API_URL, ZH_HANT } from "~/constants";
import type { PokemonOriginalAPIRes } from "~/types/pokeDetail";
import type { SpeciesPokeOriginalAPIRes } from "~/types/speciesPoke";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const pokeUrl = `${POKEMON_API_URL}/pokemon/${id}`;
    const speciesUrl = `${POKEMON_API_URL}/pokemon-species/${id}`;
    const [pokeData, speciesData] = await Promise.all([
      $fetch<PokemonOriginalAPIRes>(pokeUrl),
      $fetch<SpeciesPokeOriginalAPIRes>(speciesUrl),
    ]);
    const stats = formattedStat(pokeData.stats);
    const result = {
      id: pokeData.id,
      name:
        speciesData.names.find((i) => i.language.name === ZH_HANT)?.name || "",
      height: pokeData.height,
      weight: pokeData.weight,
      types: pokeData.types.map((t) => t.type.name),
      image: pokeData.sprites.other["official-artwork"].front_default,
      abilities: pokeData.abilities.map((a) => a.ability.name),
      stats,
      moves: pokeData.moves,
      // speciesData: speciesData,
    };
    console.log(speciesData, "speciesData");
    return result;
  } catch (e) {
    throw createError({
      message: "get pokemonDetail is error",
      status: 500,
    });
  }
});
const formattedStat = (stats: PokemonOriginalAPIRes["stats"]) => {
  const statsMap = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  stats.forEach((s: PokemonOriginalAPIRes["stats"][number]) => {
    if (s.stat.name === "hp") statsMap.hp = s.base_stat;
    if (s.stat.name === "attack") statsMap.atk = s.base_stat;
    if (s.stat.name === "defense") statsMap.def = s.base_stat;
    if (s.stat.name === "special-attack") statsMap.spa = s.base_stat;
    if (s.stat.name === "special-defense") statsMap.spd = s.base_stat;
    if (s.stat.name === "speed") statsMap.spe = s.base_stat;
  });

  return statsMap;
};
