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
    console.log(url);
    const res = await $fetch<PokeEvolutionChainRes>(url);
    const result: PokeDetailRes["evolutionChains"] = [];
    const traverse = (
      chain: PokeEvolutionChainRes["chain"], // 這裡進來的是「單個物件」
      stage: ChainObj["stage"]
    ) => {
      // 1. 先處理目前的這隻
      let baseChain = { id: getId(chain), stage: stage };
      result.push(baseChain);

      // 2. 關鍵修正：檢查有沒有下一階
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        // 因為 evolves_to 是「陣列」，所以我們要用 forEach 分別處理每一隻
        chain.evolves_to.forEach((nextForm) => {
          // 對於陣列裡的「每一隻」，再次啟動遞迴，並把階級 + 1
          traverse(nextForm, (stage + 1) as ChainObj["stage"]);
        });
      }
    };

    traverse(res.chain, 1);
    return result;
  } catch (e) {
    console.log(e, "error");
    return [];
  }
});
