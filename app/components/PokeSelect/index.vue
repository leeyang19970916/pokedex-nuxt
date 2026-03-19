<template>
  <div class="space-y-2 w-full">
    <label
      v-if="label"
      class="block text-primary/80 text-sm font-medium tracking-wide"
    >
      {{ label }}
    </label>

    <div class="relative">
      <select
        v-model="model"
        :disabled="disabled"
        class="w-full bg-black/40 border border-primary/40 rounded-md pl-4 pr-10 py-2 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(179,234,254,0.3)] appearance-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled class="bg-gray-900 text-gray-400">
          {{ placeholder }}
        </option>

        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          class="bg-gray-900 text-white"
        >
          {{ opt.label }}
        </option>
      </select>

      <div
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-primary/60"
      >
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
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 雙向綁定的值
const model = defineModel<string | number>({ default: "" });

// 定義傳入的屬性
interface OptionItem {
  label: string;
  value: string | number;
}

withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    options: OptionItem[];
    disabled?: boolean;
  }>(),
  {
    placeholder: "請選擇...",
    disabled: false,
  }
);
</script>
