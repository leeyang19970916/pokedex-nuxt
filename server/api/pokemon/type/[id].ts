import { POKEMON_API_URL } from "~/constants";
import type { PokeTypeDetailOriginalRes } from "~/types/pokeTypeDetail";

export default defineEventHandler(async (event) => {
  const typeId = getRouterParam(event, "id");
  const url = `${POKEMON_API_URL}/type/${typeId}`;
  try {
    const res = await $fetch<PokeTypeDetailOriginalRes>(url);
    const { double_damage_from, half_damage_from, no_damage_from } =
      res.damage_relations;

    return {
      double_damages: double_damage_from.map((i) => i.name),
      half_damages: half_damage_from.map((i) => i.name),
      no_damages: no_damage_from.map((i) => i.name),
    };
  } catch (e) {
    throw createError({
      message: "type detail is error",
    });
  }
});
