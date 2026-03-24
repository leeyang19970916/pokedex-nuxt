<template>
  <div
    class="relative w-full p-6 rounded-xl bg-black/50 backdrop-blur-md border border-primary/50 shadow-[0_0_25px_rgba(179,234,254,0.15)] flex flex-col gap-6"
  >
    <div class="flex items-center gap-4">
      <div class="flex-grow">
        <PokeInput
          v-model="searchForm.keywords"
          placeholder="請輸入名稱或圖鑑編號搜索..."
          @keyup.enter="executeSearch"
        />
      </div>

      <button
        @click="executeSearch"
        class="whitespace-nowrap flex items-center gap-2 px-6 py-2 rounded-md bg-primary/20 border border-primary text-primary font-bold tracking-widest hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(179,234,254,0.4)] hover:shadow-[0_0_20px_rgba(179,234,254,0.8)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        搜尋
      </button>

      <button
        @click="visible = true"
        class="whitespace-nowrap flex items-center gap-2 px-6 py-2 rounded-md bg-transparent border border-primary/50 text-primary/80 font-bold tracking-widest hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
        進階搜索
      </button>
    </div>

    <SearchResultWrapper :prevSearchForm />

    <AdvancedSearchDialog
      v-model:visible="visible"
      v-model:prevSearchForm="prevSearchForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchResultWrapper from "./SearchResultWrapper.vue";
import AdvancedSearchDialog from "~/components/Dialog/AdvancedSearch.vue";
import PokeInput from "~/components/PokeInput/index.vue";
import type { PokeSearchForm } from "~/types/pokemon";

const INIT_SEARCH_FORM: PokeSearchForm = {
  keywords: "",
  ids: [1, 1025],
  types: [],
  regions: [],
  abilities: "",
};
const prevSearchForm = ref<PokeSearchForm>(structuredClone(INIT_SEARCH_FORM));
const searchForm = ref<PokeSearchForm>(structuredClone(INIT_SEARCH_FORM));
const visible = ref(false);

// 執行一般搜尋的邏輯
const executeSearch = () => {
  if (!searchForm.value.keywords.trim()) return; // 防呆：如果沒輸入東西就不動作

  console.log("執行一般搜尋，關鍵字：", searchForm.value.keywords);
  // TODO: 這裡接你的 API 呼叫，或是更新 Pinia 裡的搜尋狀態
};
</script>
