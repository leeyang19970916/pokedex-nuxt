<template>
  <div
    class="w-full bg-primary/5 border border-primary/20 border-l-2 border-l-primary rounded-lg p-5 flex flex-col gap-4 relative overflow-hidden"
  >
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"
    ></div>

    <div class="flex items-start gap-4 z-10">
      <span
        class="text-primary/70 text-sm font-bold tracking-widest min-w-[70px] pt-0.5"
        >關鍵字：</span
      >
      <div class="text-white text-sm font-medium tracking-wide">
        {{ searchForm.keywords }}
      </div>
    </div>

    <div class="flex items-start gap-4 z-10">
      <span
        class="text-primary/70 text-sm font-bold tracking-widest min-w-[70px] pt-1"
        >屬性：</span
      >
      <div class="w-full flex flex-wrap gap-2">
        <Tag
          v-for="(type, index) in typesOptions"
          :key="index"
          :mode="'outline'"
          :type="'type'"
          :option="type"
        />
      </div>
    </div>

    <div class="flex items-start gap-4 z-10">
      <span
        class="text-primary/70 text-sm font-bold tracking-widest min-w-[70px] pt-0.5"
        >地區：</span
      >
      <div class="w-full flex flex-wrap gap-2">
        <Tag
          v-for="(region, index) in regionsOptions"
          :key="index"
          type="region"
          :option="region"
          :mode="'outline'"
        />
      </div>
    </div>

    <div class="flex items-start gap-4 z-10">
      <span
        class="text-primary/70 text-sm font-bold tracking-widest min-w-[70px] pt-0.5"
        >編號：</span
      >
      <div class="text-primary/90 text-sm font-medium tracking-wide font-mono">
        No.1 <span class="text-primary/40 mx-2">~</span> No.1025
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { POKEMON_TYPES, POKEMON_REGIONS } from "~/constants";
import Tag from "~/components/Tags/index.vue";

import { SearchContextKey } from "~/types/pokemon";

const { searchForm, tempForm, clear, revert } = inject(SearchContextKey)!;

const typesOptions = computed(() => {
  // 遍歷所有屬性，只保留「存在於 searchForm.types 陣列中」的物件
  return POKEMON_TYPES.filter((type) =>
    searchForm.value.types.includes(type.value),
  );
});

const regionsOptions = computed(() => {
  // 遍歷所有屬性，只保留「存在於 searchForm.types 陣列中」的物件
  return POKEMON_REGIONS.filter((region) =>
    searchForm.value.regions.includes(region.value),
  );
});
</script>

<style scoped>
/* 原本的 .label 樣式我直接寫進 HTML 的 class 裡了，所以 style 區塊可以直接清空或保留備用 */
</style>
