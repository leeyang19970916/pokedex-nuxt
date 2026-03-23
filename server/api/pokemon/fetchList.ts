import PokeData from "../data/pokeData.json";
import type { PokeListQuery, PokeCard } from "~/types/pokemon";

export default defineEventHandler(async (event) => {
  let list = [...PokeData] as PokeCard[];
  const query = getQuery<PokeListQuery>(event);

  const limit: number = query.limit || 20;
  const offset = query.offset || 0;
  const searchForm = query.searchForm || undefined;
  console.log(query, "query");
  const filteredList = list; //篩選後的陣列

  const paginatedlist = list.slice(offset, offset + limit); //切割後頁數的陣列
  return {
    total: filteredList.length,
    list: paginatedlist,
  };
});
