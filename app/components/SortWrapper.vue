<template>
  <div class="relative inline-block text-left w-1/4" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-black/40 border border-primary/40 text-primary/90 hover:text-primary hover:border-primary hover:shadow-[0_0_10px_rgba(179,234,254,0.3)] transition-all font-medium text-sm tracking-wide"
    >
      <span>排序：{{ currentLabel }}</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-md bg-[#0a0f1e]/90 backdrop-blur-xl border border-primary/30 shadow-[0_4px_20px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
      >
        <div class="py-1">
          <button
            v-for="option in POKEMON_SORT_OPTIONS"
            :key="option.value"
            @click="selectOption(option.value)"
            class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center justify-between"
            :class="[
              model === option.value
                ? 'bg-primary/20 text-primary font-bold' // 選中狀態
                : 'text-gray-400 hover:bg-primary/10 hover:text-primary', // 未選中狀態
            ]"
          >
            {{ option.label }}

            <svg
              v-if="model === option.value"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { POKEMON_SORT_OPTIONS } from "~/constants";

// 雙向綁定當前的排序值
const model = defineModel<string>({ default: POKEMON_SORT_OPTIONS[0].value });

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// 找出當前選中的 Label 顯示在按鈕上
const currentLabel = computed(() => {
  const found = POKEMON_SORT_OPTIONS.find((opt) => opt.value === model.value);
  return found ? found.label : "預設排序";
});

// 選擇選項的動作
const selectOption = (val: string) => {
  model.value = val;
  isOpen.value = false; // 選完自動關閉
};

// --- 以下是「點擊外面自動關閉」的貼心功能 ---
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
