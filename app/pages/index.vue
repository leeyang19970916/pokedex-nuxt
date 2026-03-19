<!-- <script setup lang="ts">
import type { TypeResult } from "~/types/nameType";

const { data, refresh, status } = await useFetch("/api/type/list");
const selectedData = ref(); //暫時的 看會選到啥 有沒有用處

const getTypeId = (url: TypeResult["url"]) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1]; // 拿最後一個數字
};
const redirectByType = async (item: TypeResult) => {
  const id = getTypeId(item.url);
  selectedData.value = await $fetch(`/api/type/${id}`);
  // navigateTo('')
};
</script>  -->

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
    <!-- 1. 首頁 Header
     title,random_pokemon -->
    <!-- 2. 篩選器 Searchbar 收合 -->
    <!-- 3. sort 排列組合 （可靠慮要不要放進篩選器) -->
    <!-- 4. list 列表 pokemon_card ,查看更多 -->
  </div>
</template>

<script lang="ts" setup>
import PokemonIndexHeader from "~/components/PokemonIndex/Header.vue";
import PokemonCard from "~/components/PokemonCard.vue";
import BottomBackground from "~/assets/image/header/list_bottom_bg.jpg";
import FilterWrapper from "~/components/FilterWrapper/index.vue";
</script>
