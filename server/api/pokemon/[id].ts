import { POKEMON_API_URL } from "~/constants";
import type { PokeDetailRes } from "~/types/pokeDetail";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const url = `${POKEMON_API_URL}/pokemon/${id}`;
  try {
    const res: PokeDetailRes = await $fetch(url);
    console.log("res", res);

    return res;
  } catch (e) {
    throw createError({
      message: "get pokemonDetail is error",
      status: 500,
    });
  }
});
