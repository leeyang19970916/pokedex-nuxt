import { POKEMON_API_URL } from "~/constants";
import type { TypeRes } from "~/types/nameType";

export default defineEventHandler(async (event) => {
  // 屬性列表
  const url = `${POKEMON_API_URL}/type`;
  try {
    const res = await $fetch<TypeRes>(url);
    return res.results;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch data from the API",
    });
  }
});
