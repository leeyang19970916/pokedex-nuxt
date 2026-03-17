<template>
  <div class="w-full text-center border-[2px] rounded-full" :class="tagClass">
    {{ type.label }}
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  type: any;
  mode: ButtonMode;
}>();
import type { ButtonMode } from "~/types/button";

const tagClass = computed(() => {
  const { mode, type } = props;
  if (mode === "solid") {
    return `bg-poke-${type.value} text-white`;
  }
  if (mode === "outline") {
    return `text-poke-${type.value} border border-poke-${type.value}`;
  }
});
</script>
