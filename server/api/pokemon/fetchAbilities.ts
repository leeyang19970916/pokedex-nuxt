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
  // 1. 組裝 URL
  const url = `${POKEMON_API_URL}/ability`;
  const query = getQuery(event);

  try {
    // 2. 直接拿 response，不要解構 { data }
    const response: Res = await $fetch(url, {
      query: {
        limit: query.limit || 20, // 順便加個預設值防呆
        offset: query.offset || 0, // 如果之後要支援換頁，可以順便接起來
      },
    });

    // 3. PokeAPI 的列表通常放在 response.results 裡面
    // 你可以根據前端的需求，決定要整包回傳，還是只回傳 results

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
