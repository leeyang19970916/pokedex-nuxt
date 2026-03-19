<template>
  <div>
    <PokemonIndexHeader />
    <div
      class="px-[3%] flex flex-col gap-6"
      :style="{ 'background-image': `url(${BottomBackground})` }"
    >
      <FilterWrapper />
      <SortWrapper class="m-[0_0_0_auto]" />
      <div class="grid grid-cols-4 gap-4">
        <PokemonCard v-for="(item, index) in 10" :key="index" />
      </div>
    </div>
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
import PokemonIndexHeader from "~/components/PokemonIndex/Header.vue";
import PokemonCard from "~/components/PokemonCard.vue";
import BottomBackground from "~/assets/image/header/list_bottom_bg.jpg";
import FilterWrapper from "~/components/FilterWrapper/index.vue";
const { data, error, status } = useFetch("/api/pokemon/random", {
  query: {
    limit: 13,
    offset: 0,
  },
});
provide("RandomList", data.value);
</script>
