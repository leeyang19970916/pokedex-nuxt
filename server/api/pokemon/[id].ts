import { POKEMON_API_URL, ZH_HANT } from "~/constants";
import type { PokeDetailRes, PokemonOriginalAPIRes } from "~/types/pokeDetail";
import type { SpeciesPokeOriginalAPIRes } from "~/types/speciesPoke";
import { translateVariantName } from "~~/utils/translateVariantName";
import { formattedStat } from "~~/utils/formattedStat";
import MovesRawData from "~~/server/api/rawData/moves.json";

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
    const entryText =
      speciesData.flavor_text_entries
        .find((entry) => entry.language.name === ZH_HANT)
        ?.flavor_text.replace(/[\n\f\r]/g, "") || "這隻寶可夢目前沒有描述";
    const varieties = speciesData.varieties.map((itm) => {
      const urlParts = itm.pokemon.url.split("/").filter(Boolean);
      const variantId = urlParts[urlParts.length - 1];
      return {
        name: translateVariantName(itm.pokemon.name),
        id: Number(variantId),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${variantId}.png`,
      };
    });
    const evolutionChains =
      (await $fetch("/api/pokemon/fetchEvolutionIds", {
        query: {
          url: speciesData.evolution_chain.url,
        },
      })) || [];

    const moves = pokeData.moves.map((i) => {
      const { name } = i.move;
      return (MovesRawData as any)[name];
    });

    const result = {
      id: pokeData.id,
      name: translateVariantName(pokeData.name),
      height: pokeData.height,
      weight: pokeData.weight,
      types: pokeData.types.map((t) => t.type.name),
      image: pokeData.sprites.other["official-artwork"].front_default,
      abilities: pokeData.abilities.map((a) => a.ability.name),
      stats,
      moves,
      entryText,
      varieties,
      evolutionChains,
    };
    return result;
  } catch (e) {
    throw createError({
      message: "get pokemonDetail is error",
      status: 500,
    });
  }
});
