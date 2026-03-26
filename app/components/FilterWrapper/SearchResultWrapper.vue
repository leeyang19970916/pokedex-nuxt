<template>
  <div
    v-if="isShowWrapper"
    class="w-full bg-primary/5 border border-primary/20 border-l-2 border-l-primary rounded-lg p-5 flex flex-col gap-4 relative overflow-hidden"
  >
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"
    ></div>

    <div v-if="searchForm.keywords" class="flex items-start gap-4 z-10">
      <span class="search-key">關鍵字：</span>
      <div class="text-primary/90 text-sm font-medium tracking-wide">
        {{ searchForm.keywords }}
      </div>
    </div>

    <div v-if="searchForm.types.length" class="flex items-start gap-4 z-10">
      <span class="search-key pt-1">屬性：</span>
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

    <div v-if="searchForm.regions.length" class="flex items-start gap-4 z-10">
      <span class="search-key pt-1">地區：</span>
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
    <div v-if="searchForm.ability" class="flex items-start gap-4 z-10">
      <span class="search-key">特性：</span>
      <div class="text-primary/90 text-sm font-medium tracking-wide font-mono">
        {{ searchForm.ability }}
      </div>
    </div>

    <div v-if="isShowIdsRange" class="flex items-start gap-4 z-10">
      <span class="search-key">圖鑑編號：</span>
      <div class="text-primary/90 text-sm font-medium tracking-wide font-mono">
        No.{{ searchForm.ids[0] }}
        <span class="text-primary/40 mx-2">~</span> No.{{ searchForm.ids[1] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { POKEMON_TYPES, POKEMON_REGIONS, SLIDER_RANGE } from "~/constants";
import Tag from "~/components/Tags/index.vue";

import { SearchContextKey } from "~/types/pokemon";

const { searchForm } = inject(SearchContextKey)!;

const typesOptions = computed(() => {
  // 遍歷所有屬性，只保留「存在於 searchForm.types 陣列中」的物件
  return POKEMON_TYPES.filter((type) =>
    searchForm.value.types.includes(type.value)
  );
});

const regionsOptions = computed(() => {
  // 遍歷所有屬性，只保留「存在於 searchForm.types 陣列中」的物件
  return POKEMON_REGIONS.filter((region) =>
    searchForm.value.regions.includes(region.value)
  );
});
const isShowIdsRange = computed(() => {
  const [min, max] = searchForm.value.ids;
  if (SLIDER_RANGE.max === max && SLIDER_RANGE.min === min) {
    return false;
  }
  return true;
});

const isShowWrapper = computed(() => {
  const { keywords, types, regions, ability } = searchForm.value;
  return (
    keywords ||
    types.length ||
    regions.length ||
    ability ||
    isShowIdsRange.value
  );
});
</script>

<style scoped>
.search-key {
  @apply text-primary/70 text-sm font-bold tracking-widest min-w-[80px];
}
</style>
