// https://pokeapi.co/api/v2/pokemon/ditto

import { POKEMON_API_URL } from "~/constants";
import type { PokeListRes, PokeCard } from "~/types/pokemon";

export default defineEventHandler(async (event) => {
  const url = `${POKEMON_API_URL}/pokemon`;
  const query = getQuery(event);
  try {
    const res: PokeListRes = await $fetch(url, {
      query: {
        limit: query.limit || 0,
        offset: query.offset || 0,
      },
    });
    const getPromises = res.results.map((i) => $fetch(i.url));
    const getPokeDetails = await Promise.all(getPromises);
    // 4. 資料清洗：把 PokeAPI 那幾百行沒用的欄位拔掉，只留前端卡片需要的！
    const pokes: PokeCard[] = getPokeDetails.map((detail: any) => ({
      id: detail.id,
      name: detail.name,
      image:
        detail.sprites.other["official-artwork"].front_default ||
        detail.sprites.front_default,
      types: detail.types.map((t: any) => t.type.name),
    }));

    // 5. 重新包裝回傳格式，把原本的 results 替換成我們的完美資料
    return {
      count: res.count, // 保留總筆數 (前端算分頁會用到)
      next: res.next, // 保留下一頁的網址
      previous: res.previous, // 保留上一頁的網址
      results: pokes,
    };
  } catch (e) {
    console.error("Error fetching data:", e);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch data from the API",
    });
  }
});
