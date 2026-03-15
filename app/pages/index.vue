<!-- <template>
  <div>
    <button @click="() => refresh()">1212</button>
    <div v-for="item in data" :key="item.name">
      <button @click="() => redirectByType(item)">
        {{ item.name }}
      </button>
    </div>
    <pre>
      {{ selectedData }}
    </pre>
  </div>
</template>

<script setup lang="ts">
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
</script> -->

<template>
  <div>
    <!-- 1. 首頁 Header
     title,random_pokemon -->
    <!-- 2. 篩選器 Searchbar 收合 -->
    <!-- 3. sort 排列組合 （可靠慮要不要放進篩選器) -->
    <!-- 4. list 列表 pokemon_card ,查看更多 -->
  </div>
</template>
