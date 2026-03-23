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
      <FilterWrapper @search="(val:any) => search('flter', val)" />
      <SortWrapper
        class="m-[0_0_0_auto]"
        @search="(val:any) => search('sort', val)"
      />
      <div class="grid grid-cols-4 gap-4">
        <PokemonCard
          v-for="poke in listState.list"
          :key="`${poke.id}-${poke.name}`"
          :poke
        />
      </div>
      <button @click="() => search('next')">view more</button>
    </div>
    {{ data }}
    {{ status }}
  </div>
</template>

<script lang="ts" setup>
import PokemonIndexHeader from "~/components/PokemonIndex/Header.vue";
import PokemonCard from "~/components/PokemonCard.vue";
import BottomBackground from "~/assets/image/header/list_bottom_bg.jpg";
import FilterWrapper from "~/components/FilterWrapper/index.vue";
import type { PokeListQuery, PokeCard } from "~/types/pokemon";
import { usePokeStore } from "~/store/pokeStore";

const INIT_LIST_QUERY: PokeListQuery = {
  limit: 20,
  offset: 0,
  searchForm: {},
  sort: "",
};

interface State {
  total: number;
  list: PokeCard[];
  limit: number;
  offset: number;
  isLoading: boolean;
}

const LIST_STATE: State = {
  total: 0,
  list: [],
  limit: INIT_LIST_QUERY.limit,
  offset: INIT_LIST_QUERY.offset,
  isLoading: false,
};
const randomList = useFetch("/api/pokemon/random", {
  lazy: true,
  query: {
    limit: 13,
  },
});
const { data, status } = await useFetch("/api/pokemon/fetchList", {
  key: "pokeList",
  query: {
    ...INIT_LIST_QUERY,
  },
});

const listState = ref<State>(structuredClone(LIST_STATE));

if (data.value?.list && status.value === "success") {
  console.log(data, "data???");
  listState.value.isLoading = false;
  listState.value.list = data.value.list;
  listState.value.total = data.value.total;
}

const search = async (type: any, val?: any) => {
  // const query = {
  //   ...INIT_LIST_QUERY,
  //   offset: INIT_LIST_QUERY.offset + INIT_LIST_QUERY.limit,
  // };
  listState.value.isLoading = true;
  listState.value.offset += listState.value.limit;
  const { list, total } = await $fetch("/api/pokemon/fetchList", {
    query: {
      ...INIT_LIST_QUERY,
      offset: listState.value.offset,
    },
  });
  listState.value.list = [...listState.value.list, ...list];
  listState.value.total = total;
};
</script>
