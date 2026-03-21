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
      <FilterWrapper />
      <SortWrapper class="m-[0_0_0_auto]" />
      <div v-if="!listState.isLoading" class="grid grid-cols-4 gap-4">
        <PokemonCard
          v-for="poke in pokeStore.pokeList"
          :key="`${poke.id}-${poke.name}`"
          :poke
        />
      </div>
      <button @click="getMore">view more</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PokemonIndexHeader from "~/components/PokemonIndex/Header.vue";
import PokemonCard from "~/components/PokemonCard.vue";
import BottomBackground from "~/assets/image/header/list_bottom_bg.jpg";
import FilterWrapper from "~/components/FilterWrapper/index.vue";
import type { PokeCard } from "~/types/pokemon";
import { usePokeStore } from "~/store/pokeStore";

interface State {
  list: PokeCard[];
  limit: number;
  offset: number;
  isLoading: boolean;
}

const LIST_STATE: State = {
  list: [],
  limit: 20,
  offset: 0,
  isLoading: false,
};

const pokeStore = usePokeStore();
const randomList = useFetch("/api/pokemon/random", {
  query: {
    limit: 13,
  },
});
const { data } = useFetch("/api/pokemon/fetchPokemonList", {
  key: "pokeIndex",
});

if (data.value) {
  pokeStore.setList(data.value);
}

const listState = ref<State>(structuredClone(LIST_STATE));

const getMore = async () => {
  try {
    listState.value.offset = listState.value.offset + listState.value.limit;
    const res = await $fetch("/api/pokemon/fetchList", {
      query: {
        limit: listState.value.limit,
        offset: listState.value.offset,
      },
    });
    listState.value.list = [...listState.value.list];
  } catch (e) {
    console.log(e);
  }
};
</script>
