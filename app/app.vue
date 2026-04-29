<template>
  <NuxtLayout :name="'default'">
    <button @click="testSentry">測試 Sentry 報錯</button>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { POKEDEX } from "./constants";

const testSentry = () => {
  console.log("正在發送測試錯誤到 Sentry...");
  // 故意丟出一個錯誤
  throw new Error("這是我的第一筆 Sentry 測試錯誤！");
};

useHead({
  titleTemplate: (pokeName) => `${pokeName ? `${pokeName} | ` : ""}${POKEDEX}`,
});
useSeoMeta({
  description: "收錄全世代寶可夢數據，提供最詳細的屬性與數值分析。",
});
</script>
