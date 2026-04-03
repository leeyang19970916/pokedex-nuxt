import type { PokeEvolutionChainRes } from "~/types/pokeEvolutionChain";
import type { PokeDetailRes } from "~/types/pokeDetail";
type ChainObj = PokeDetailRes["evolutionChains"][number];

const getId = (chain: PokeEvolutionChainRes["chain"]): PokeDetailRes["id"] => {
  const urlParts = chain.species.url.split("/").filter(Boolean).reverse();
  const id = urlParts[0];
  return Number(id);
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const url = query.url as string;
    const res = await $fetch<PokeEvolutionChainRes>(url);
    const result: PokeDetailRes["evolutionChains"] = [];
    const traverse = (
      chain: PokeEvolutionChainRes["chain"],
      stage: ChainObj["stage"]
    ) => {
      let baseChain = { id: getId(chain), stage: stage };
      result.push(baseChain);
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((nextForm) => {
          traverse(nextForm, (stage + 1) as ChainObj["stage"]);
        });
      }
    };

    traverse(res.chain, 1);
    return result;
  } catch (e) {
    console.error(e, "error");
    return [];
  }
});
