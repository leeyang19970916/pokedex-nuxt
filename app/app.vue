<template>
  <NuxtErrorBoundary @error="onGlobalError">
    <template #default>
      <NuxtLayout :name="'default'">
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </template>
    <template #error="{ error, clearError }">
      <div class="p-4 border border-red-200 bg-red-50 rounded-lg text-center">
        <p class="text-red-600 font-bold">資料暫時無法讀取</p>
        <p class="text-sm text-red-400 mb-3">{{ error.message }}</p>

        <button
          @click="clearError"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          嘗試重新載入
        </button>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
<script setup lang="ts">
import { POKEDEX } from "./constants";
import * as Sentry from "@sentry/vue";

const onGlobalError = (e: Error) => {
  Sentry.captureException(e);
};

useHead({
  titleTemplate: (pokeName) => `${pokeName ? `${pokeName} | ` : ""}${POKEDEX}`,
});
useSeoMeta({
  description: "收錄全世代寶可夢數據，提供最詳細的屬性與數值分析。",
});
</script>
