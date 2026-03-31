import { POKEMON_SORT_OPTIONS } from "~/constants";
import PokedexData from "../rawData/pokedex.json";
import type { QueryFormat, PokeCard, PokeSort } from "~/types/pokemon";

export default defineEventHandler(async (event) => {
  try {
    let list = [...PokedexData] as PokeCard[];

    const query = getQuery<QueryFormat>(event);
    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) || 0;
    const sort = query.sort || POKEMON_SORT_OPTIONS[0].value;
    let q: QueryFormat = {
      ...query,
      regions: formatArray(query.regions),
      types: formatArray(query.types),
    };

    list = filterBy(list, q);
    list = sortBy(list, sort);

    const paginatedlist = list.slice(offset, offset + limit);
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
const filterBy = (list: PokeCard[], query: QueryFormat) => {
  const { keywords, ability, maxId, minId, regions, types } = query;
  if (keywords) {
    list = list.filter((poke) => {
      const { id, name } = poke;
      return String(id).includes(keywords) || name.includes(keywords);
    });
  }
  if (ability) {
    list = list.filter((poke) => {
      return poke.abilities.includes(ability);
    });
  }
  if (maxId && minId) {
    list = list.filter((poke) => {
      return poke.id >= minId && poke.id <= maxId;
    });
  }
  if (regions) {
    list = list.filter((poke) => {
      return regions.some((r) => poke.region === r);
    });
  }
  if (types) {
    list = list.filter((poke) => {
      return types.every((t) => poke.types.includes(t));
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

const formatArray = <T>(val: T | T[] | undefined): T[] | undefined => {
  if (!val) return undefined;
  if (Array.isArray(val)) {
    return val;
  } else {
    return [val];
  }
};
