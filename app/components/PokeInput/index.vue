<template>
  <div class="space-y-2 w-full">
    <label
      v-if="label"
      class="block text-primary/80 text-sm font-medium tracking-wide"
    >
      {{ label }}
    </label>

    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full bg-black/40 border border-primary/40 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(179,234,254,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number>();

withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    type?: "text" | "number" | "password";
    disabled?: boolean;
  }>(),
  {
    type: "text",
    placeholder: "請輸入...",
    disabled: false,
  }
);
</script>
