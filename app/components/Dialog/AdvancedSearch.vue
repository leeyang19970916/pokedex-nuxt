<template>
  <el-dialog
    v-model="model"
    width="50vw"
    top="15vh"
    :show-close="false"
    class="tech-dialog"
    :append-to-body="true"
  >
    <template #header="{ close }">
      <div
        class="flex items-center justify-between pb-3 border-b border-primary/30"
      >
        <h3
          class="text-primary text-lg font-bold tracking-widest drop-shadow-[0_0_8px_rgba(179,234,254,0.5)]"
        >
          進階搜尋
        </h3>
        <button
          @click="close"
          class="text-gray-400 hover:text-primary transition-colors flex items-center justify-center p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </template>

    <div class="py-4 space-y-6 text-white">
      <PokeInput v-model="input" placeholder="請輸入名稱或圖鑑編號搜索..." />

      <div class="space-y-2">
        <label class="block text-primary/80 text-sm font-medium tracking-wide"
          >屬性</label
        >
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="(type, index) in POKEMON_TYPES"
            :key="index"
            :mode="'outline'"
            :type="'type'"
            :option="type"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-primary/80 text-sm font-medium tracking-wide"
          >地區</label
        >
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="(region, index) in POKEMON_REGIONS"
            :key="index"
            type="region"
            :option="region"
            :mode="'outline'"
          ></Tag>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <PokeSelect
          v-model="selectedAbility"
          label="特性"
          :options="pokeStore.abilities"
        ></PokeSelect>

        <div class="space-y-2">
          <label class="block text-primary/80 text-sm font-medium tracking-wide"
            >圖鑑編號 (1 ~ 1025)</label
          >
          <div class="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              class="w-full bg-black/40 border border-primary/40 rounded-md px-4 py-2 text-center text-white focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(179,234,254,0.3)] transition-all"
            />
            <span class="text-primary/60">~</span>
            <input
              type="number"
              placeholder="Max"
              class="w-full bg-black/40 border border-primary/40 rounded-md px-4 py-2 text-center text-white focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(179,234,254,0.3)] transition-all"
            />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div
        class="flex justify-end items-center gap-4 pt-4 border-t border-primary/30"
      >
        <button
          class="text-sm text-gray-400 hover:text-white transition-colors"
        >
          還原
        </button>
        <button
          class="px-5 py-1.5 rounded-md border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all text-sm"
        >
          重置
        </button>
        <button
          @click="model = false"
          class="px-8 py-1.5 rounded-md bg-primary/20 border border-primary text-primary font-bold hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(179,234,254,0.4)] hover:shadow-[0_0_20px_rgba(179,234,254,0.8)] tracking-wide"
        >
          搜尋
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { POKEMON_TYPES, POKEMON_REGIONS } from "~/constants";
import PokeInput from "../PokeInput/index.vue";
import PokeSelect from "../PokeSelect/index.vue";
import Tag from "~/components/Tags/index.vue";
import { usePokeStore } from "~/store/pokeStore";

const model = defineModel<boolean>();
const pokeStore = usePokeStore();

// 記得綁定一個變數來接選到的值
const selectedAbility = ref(undefined);
const input = ref("");
</script>

<style>
/* ⚠️ 這裡非常重要！
    因為 el-dialog 預設會被 Teleport 到 body 底下，
    所以不能加 `scoped`，否則樣式會吃不到！
  */
.tech-dialog {
  /* 把預設的白底換成深色微透明，搭配毛玻璃效果 */
  background: rgba(10, 15, 30, 0.85) !important;
  backdrop-filter: blur(12px) !important;
  /* 加上你專屬的 primary border 跟發光效果 */
  border: 1px solid rgba(179, 234, 254, 0.4) !important;
  box-shadow:
    0 0 30px rgba(0, 0, 0, 0.8),
    inset 0 0 20px rgba(179, 234, 254, 0.05) !important;
  border-radius: 12px !important;
}

/* 隱藏 Element 預設的 padding 跟 header 背景，讓我們自己控制 */
.tech-dialog .el-dialog__header,
.tech-dialog .el-dialog__body,
.tech-dialog .el-dialog__footer {
  background: transparent !important;
  margin-right: 0 !important;
}

/* 稍微調整過渡動畫，讓它打開時有科技感 */
.el-overlay-dialog {
  backdrop-filter: blur(4px);
}
</style>
