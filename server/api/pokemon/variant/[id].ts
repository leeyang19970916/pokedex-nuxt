import { POKEMON_API_URL } from "~/constants";
import type { PokemonOriginalAPIRes } from "~/types/pokeDetail";
import { translateVariantName } from "~~/utils/translateVariantName";
import { formattedStat } from "~~/utils/formattedStat";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const pokeUrl = `${POKEMON_API_URL}/pokemon/${id}`;
  try {
    const res = await $fetch<PokemonOriginalAPIRes>(pokeUrl);
    const stats = formattedStat(res.stats);

    const result = {
      id: res.id,
      name: translateVariantName(res.name),
      height: res.height,
      weight: res.weight,
      types: res.types.map((t) => t.type.name),
      image: res.sprites.other["official-artwork"].front_default,
      abilities: res.abilities.map((a) => a.ability.name),
      stats,
    };
    return result;
  } catch (e) {
    throw createError({
      message: "Fetch PokemonDetail's variant API is error",
      status: 500,
    });
  }
});
