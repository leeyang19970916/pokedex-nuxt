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
      <FilterWrapper @search="(val: any) => handleFilter(val)" />
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
import type { PokeListQuery, PokeCard } from "~/types/pokemon";
import { POKEMON_SORT_OPTIONS } from "~/constants";
import { usePokeStore } from "~/store/pokeStore";

const pokeStore = usePokeStore();
const INIT_LIST_QUERY: PokeListQuery = {
  limit: 20,
  offset: 0,
  searchForm: "",
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
  limit: INIT_LIST_QUERY.limit,
  offset: INIT_LIST_QUERY.offset,
  isLoading: true,
  searchForm: INIT_LIST_QUERY.searchForm,
  sort: INIT_LIST_QUERY.sort,
});

const randomList = useFetch("/api/pokemon/random", {
  lazy: true,
  query: {
    limit: 13,
  },
});
const { data, error, status } = await useFetch("/api/pokemon/fetchList", {
  query: {
    ...INIT_LIST_QUERY,
  },
});

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
const handleFilter = (val: any) => {
  const query: PokeListQuery = {
    limit: INIT_LIST_QUERY.limit,
    offset: INIT_LIST_QUERY.offset,
    sort: state.value.sort,
    searchForm: val,
  };
  fetchUpdateist(query);
};
const handleSort = () => {
  const { sort } = state.value;
  const query: PokeListQuery = {
    limit: INIT_LIST_QUERY.limit,
    offset: INIT_LIST_QUERY.offset,
    sort,
    searchForm: state.value.searchForm,
  };
  fetchUpdateist(query);
};
const fetchUpdateist = async (
  query: PokeListQuery,
  isAppend: boolean = false,
) => {
  console.log(query, "query: fetchUpdateist");
  state.value.isLoading = true;
  try {
    const { list, total } = await $fetch("/api/pokemon/fetchList", {
      query,
    });

    if (isAppend) {
      state.value.list.push(...list);
    } else {
      state.value.list = list;
    }
    state.value.total = total;
    state.value.isLoading = false;
  } catch (e) {
    state.value.isLoading = false;
    console.log(e);
  }
};
</script>
