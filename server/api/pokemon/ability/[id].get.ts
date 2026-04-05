import { POKEMON_API_URL } from "~/constants";
import type { PokeAbilityOriginalAPIRes } from "~/types/pokeAbility";
import { ZH_HANT } from "~/constants";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    const url = `${POKEMON_API_URL}/ability/${id}`;

    const res = await $fetch<PokeAbilityOriginalAPIRes>(url);

    const zhName =
      res.names.find((item) => item.language.name === ZH_HANT)?.name ||
      res.names.find((item) => item.language.name === "zh-hans")?.name ||
      res.name;

    return { zhName };
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: "Fetch Ability ZhName API is errpr",
    });
  }
});
