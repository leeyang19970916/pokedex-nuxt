<template>
  <div
    class="relative w-full p-6 rounded-xl bg-black/50 backdrop-blur-md border border-primary/50 shadow-[0_0_25px_rgba(179,234,254,0.15)] flex flex-col gap-6"
  >
    <div class="flex items-center gap-4">
      <div class="flex-grow">
        <PokeInput v-model="input" placeholder="請輸入名稱或圖鑑編號搜索..." />
      </div>

      <button
        @click="visible = true"
        class="whitespace-nowrap flex items-center gap-2 px-6 py-2 rounded-md bg-primary/10 border border-primary text-primary font-bold tracking-widest hover:bg-primary hover:text-black transition-all shadow-[0_0_10px_rgba(179,234,254,0.3)] hover:shadow-[0_0_20px_rgba(179,234,254,0.8)]"
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
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
        進階搜索
      </button>
    </div>

    <SearchResultWrapper />

    <AdvancedSearchDialog v-model="visible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchResultWrapper from "./SearchResultWrapper.vue";
import AdvancedSearchDialog from "~/components/Dialog/AdvancedSearch.vue";
import PokeInput from "~/components/PokeInput/index.vue";

const input = ref("");
const visible = ref(false);
</script>
