<template>
  <div>
    <PokemonIndexHeader
      v-if="randomList.status.value === 'success' && randomList.data.value"
      :list="randomList.data.value"
    />
    <div
      class="px-[3%] pb-[10%] flex flex-col gap-6"
      :style="{ 'background-image': `url(${BottomBackground})` }"
    >
      <FilterWrapper @search="handleFilter" />
      <SortWrapper
        v-model="state.sort"
        class="m-[0_0_0_auto]"
        @search="handleSort()"
      />
      <div class="grid grid-cols-4 gap-4">
        <PokemonCard
          v-for="poke in state.list"
          :key="`${poke.id}-${poke.name}`"
          :poke
        />
      </div>
      <button @click="next">view more</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PokemonIndexHeader from "~/components/PokemonIndex/Header.vue";
import PokemonCard from "~/components/PokemonCard.vue";
import BottomBackground from "~/assets/image/header/list_bottom_bg.jpg";
import FilterWrapper from "~/components/FilterWrapper/index.vue";
import type {
  PokeListQuery,
  PokeCard,
  PokeSearchForm,
  QueryFormat,
} from "~/types/pokemon";
import {
  POKEMON_SORT_OPTIONS,
  DEFAULT_SEARCH_FORM,
  SLIDER_RANGE,
} from "~/constants";
import { usePokeStore } from "~/store/pokeStore";

const pokeStore = usePokeStore();
const DEFAULT_LIST_QUERY: PokeListQuery = {
  limit: 20,
  offset: 0,
  searchForm: DEFAULT_SEARCH_FORM,
  sort: POKEMON_SORT_OPTIONS[0].value,
};

interface State {
  total: number;
  list: PokeCard[];
  limit: PokeListQuery["limit"];
  offset: PokeListQuery["offset"];
  isLoading: boolean;
  searchForm: PokeListQuery["searchForm"];
  sort: PokeListQuery["sort"];
}
const state = ref<State>({
  total: 0,
  list: [],
  limit: DEFAULT_LIST_QUERY.limit,
  offset: DEFAULT_LIST_QUERY.offset,
  isLoading: true,
  searchForm: DEFAULT_LIST_QUERY.searchForm,
  sort: DEFAULT_LIST_QUERY.sort,
});

const randomList = useFetch("/api/pokemon/random", {
  lazy: true,
  query: {
    limit: 13,
  },
});
const { data, error, status } = await useFetch("/api/pokemon/fetchList");

const abilities = useFetch("/api/pokemon/fetchAbilities", {
  lazy: true,
  query: {
    limit: 400,
  },
});
if (abilities.status.value === "success" && abilities.data.value) {
  pokeStore.setAbilities(abilities.data.value);
}

if (data.value && status.value === "success") {
  state.value.isLoading = false;
  state.value.list = data.value.list;
  state.value.total = data.value.total;
} else if (error.value) {
  console.error("初始化 API 壞了：", error.value?.message);
}
state.value.isLoading = false;

const next = () => {
  state.value.offset += state.value.limit;
  const query: PokeListQuery = {
    limit: state.value.limit,
    offset: state.value.offset,
    sort: state.value.sort,
    searchForm: state.value.searchForm,
  };
  fetchUpdateist(query, true);
};
const handleFilter = (searchForm: PokeSearchForm) => {
  const query: PokeListQuery = {
    limit: DEFAULT_LIST_QUERY.limit,
    offset: DEFAULT_LIST_QUERY.offset,
    sort: state.value.sort,
    searchForm: searchForm,
  };
  fetchUpdateist(query);
};
const handleSort = () => {
  const { sort } = state.value;
  const query: PokeListQuery = {
    limit: DEFAULT_LIST_QUERY.limit,
    offset: DEFAULT_LIST_QUERY.offset,
    sort,
    searchForm: state.value.searchForm,
  };
  fetchUpdateist(query);
};
const fetchUpdateist = async (
  query: PokeListQuery,
  isAppend: boolean = false
) => {
  console.log(query, "query: fetchUpdateist");
  state.value.isLoading = true;
  const { limit, offset, searchForm, sort } = query;
  let queryFormat: QueryFormat = {
    limit,
    offset,
    sort,
    keywords: searchForm.keywords || undefined,
    types: searchForm.types || undefined,
    regions: searchForm.regions || undefined,
    ability: searchForm.ability || undefined,
    ...getRange(searchForm.ids),
  };
  try {
    const { list, total } = await $fetch("/api/pokemon/fetchList", {
      query: queryFormat,
    });

    if (isAppend) {
      state.value.list.push(...list);
    } else {
      state.value.list = list;
    }
    state.value.total = total;
  } catch (e) {
    console.log(e);
  } finally {
    state.value.isLoading = false;
  }
};

const getRange = (ids: PokeSearchForm["ids"]) => {
  const [minId, maxId] = ids;
  if (minId === SLIDER_RANGE.min && maxId === SLIDER_RANGE.max)
    return undefined;

  return {
    minId,
    maxId,
  };
};
</script>
