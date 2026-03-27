import { POKEMON_API_URL } from "~/constants";
import type { PokeInfoRes } from "~/types/pokeInfo";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = `${POKEMON_API_URL}/pokemon/${query.id}`;
  try {
    const res = await $fetch(url);

    const results: PokeInfoRes = {
      id: res.id,
    };
    return results;
  } catch (e) {
    throw createError({
      message: "get pokemonDetail is error",
      status: 500,
    });
  }
});
