<template>
  <div
    class="evo-ball relative md:w-20 md:h-20 flex justify-center items-center rounded-full primary-border cursor-pointer"
  >
    <NuxtImg
      loading="lazy"
      :src="image"
      :alt="name"
      class="w-[80%] h-[80%] z-10"
    />
    <div class="evo-ring-inner"></div>
  </div>
</template>

<script lang="ts" setup>
import type { PokeDetailRes } from "~/types/pokeDetail";

defineProps<{
  name: PokeDetailRes["name"];
  image: PokeDetailRes["image"];
}>();
</script>

<style lang="scss">
/* 基礎樣式微調：讓原本的球體更有層次感 */
.evo-ball {
  @apply transition-all duration-300 ease-in-out bg-slate-900/40;
  border-color: rgba(6, 182, 212, 0.3); /* 沒選中時，邊框暗一點 */
}

.evo-ball:hover {
  @apply scale-105 border-cyan-400;
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
}

/* 核心：isActive 樣式 */
.isActive {
  @apply border-cyan-400 scale-110 z-20;
  background: radial-gradient(
    circle,
    rgba(34, 211, 238, 0.2) 0%,
    rgba(15, 23, 42, 0.8) 100%
  );

  /* 1. 外發光效果：像霓虹燈一樣亮起來 */
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.6),
    inset 0 0 15px rgba(34, 211, 238, 0.4);
}

/* 2. 進階技巧：加上一個微小的旋轉掃描光環 */
.isActive::before {
  content: "";
  @apply absolute inset-[-4px] rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 讓圖片在選中時更鮮艷 */
.isActive img {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
  @apply scale-110;
}
</style>
