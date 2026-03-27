import { POKEMON_API_URL } from "~/constants";
import type { Url, PokeAbility } from "~/types/pokemon";

interface Res {
  count: number;
  next: Url;
  previous: Url;
  results: {
    name: string;
    url: Url;
  }[];
}

export default defineEventHandler(async (event) => {
  const url = `${POKEMON_API_URL}/ability`;
  const query = getQuery(event);

  try {
    const response: Res = await $fetch(url, {
      query: {
        limit: query.limit || 20,
        offset: query.offset || 0,
      },
    });

    const results: PokeAbility[] = response.results.map((i) => ({
      label: i.name,
      value: i.name,
      id: Number(i.url.split("/").filter(Boolean).pop()) || 0,
    }));
    return results;
  } catch (error) {
    console.error("抓取特性 API 失敗：", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch ability",
    });
  }
});
