import { POKEMON_SORT_OPTIONS } from "~/constants";
import PokeData from "../data/pokeData.json";
import type {
  PokeListQuery,
  PokeCard,
  PokeSort,
  PokeSearchForm,
} from "~/types/pokemon";

export default defineEventHandler(async (event) => {
  try {
    let list = [...PokeData] as PokeCard[];

    const query = getQuery<PokeListQuery>(event);

    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) || 0;
    const sort = query.sort || POKEMON_SORT_OPTIONS[0].value;
    // let filteredList: PokeCard[] = list; //篩選後的陣列
    // if (searchForm) {
    //   list = filterBy(list, searchForm);
    // }

    list = sortBy(list, sort);

    const paginatedlist = list.slice(offset, offset + limit); //切割後頁數的陣列
    return {
      total: list.length,
      list: paginatedlist,
    };
  } catch (e) {
    throw createError({
      status: 500,
      message: "api error",
    });
  }
});
const filterBy = (list: PokeCard[], searchForm: PokeSearchForm) => {
  const { keywords, ability, ids, regions, types } = searchForm;
  if (keywords.trim()) {
    list = list.filter((poke) => {
      const { id, name } = poke;
      return String(id).includes(keywords) || name.includes(keywords);
    });
  }

  return list;
};

const sortBy = (list: PokeCard[], sort: PokeSort) => {
  if (sort === "height_asc") {
    list = list.sort((a, b) => a.height - b.height);
  } else if (sort === "height_desc") {
    list = list.sort((a, b) => b.height - a.height);
  } else if (sort === "weight_asc") {
    list = list.sort((a, b) => a.weight - b.weight);
  } else if (sort === "weight_desc") {
    list = list.sort((a, b) => b.weight - a.weight);
  } else if (sort === "id_asc") {
    list = list.sort((a, b) => a.id - b.id);
  } else if (sort === "id_desc") {
    list = list.sort((a, b) => b.id - a.id);
  }

  return list;
};
