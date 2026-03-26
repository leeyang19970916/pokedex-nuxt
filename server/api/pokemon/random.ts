import { POKEMON_API_URL, SLIDER_RANGE } from "~/constants";
import type { PokeCard } from "~/types/pokemon";

function getRandomNums(params: { limit: number; min: number; max: number }) {
  const selected = new Set();
  const { limit, min, max } = params;
  // 當數量還沒抽滿時，持續抽取
  while (selected.size < limit) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    selected.add(randomNum);
  }

  // 將 Set 轉換回陣列回傳
  return Array.from(selected);
}

export default defineEventHandler(async (event) => {
  try {
    const url = `${POKEMON_API_URL}/pokemon`;
    const query = getQuery<{
      limit: number;
    }>(event);

    const params = {
      limit: query.limit,
      min: SLIDER_RANGE.min,
      max: SLIDER_RANGE.max,
    };
    const randomNums = getRandomNums(params);
    const promises = randomNums.map((id) => $fetch(`${url}/${id}`));
    const res = await Promise.all(promises);
    const result: Pick<PokeCard, "id" | "image">[] = res.map((detail: any) => ({
      id: detail.id,
      image:
        detail.sprites.other["official-artwork"].front_default ||
        detail.sprites.front_default,
    }));
    return result;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch data from the API",
    });
  }
});
