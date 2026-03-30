import type { PokeEvolutionChainRes } from "~/types/pokeEvolutionChain";

const getEvolutionIds = (chain: PokeEvolutionChainRes["chain"]): number[] => {
  const urlParts = chain.species.url.split("/").filter(Boolean);
  const currentId = Number(urlParts[urlParts.length - 1]);

  const childrenIds = chain.evolves_to.flatMap(
    (childNode: PokeEvolutionChainRes["chain"]) => getEvolutionIds(childNode)
  );

  return [currentId, ...childrenIds];
};
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const url = query.url as string;
    const res = await $fetch<PokeEvolutionChainRes>(url);

    return getEvolutionIds(res.chain);
  } catch (e) {
    console.log(e, "error");
    return [];
  }
});
