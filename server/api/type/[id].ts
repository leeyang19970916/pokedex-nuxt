import { POKEMON_API_URL } from "~/constants";
import type { TypeDetailRes } from "~/types/nameType";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const url = `${POKEMON_API_URL}/type/${id}`;
  try {
    const res = await $fetch<TypeDetailRes>(url);
    return res;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch data from the API",
    });
  }
});
