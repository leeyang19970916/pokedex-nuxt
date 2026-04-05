<template>
  <NuxtLayout :name="'default'">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { POKEDEX } from "./constants";

useHead({
  titleTemplate: (pokeName) => `${pokeName ? `${pokeName} | ` : ""}${POKEDEX}`,
});
useSeoMeta({
  description: "收錄全世代寶可夢數據，提供最詳細的屬性與數值分析。",
});
</script>
