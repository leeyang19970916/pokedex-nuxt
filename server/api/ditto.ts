// https://pokeapi.co/api/v2/pokemon/ditto

export default defineEventHandler(async (event) => {
  const url = "https://pokeapi.co/api/v2/pokemon/ditto";
  const config = useRuntimeConfig();
  try {
    const res = await $fetch(url);
    console.log("res:", res, "config:", config);
    return res;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch data from the API",
    });
  }
});
