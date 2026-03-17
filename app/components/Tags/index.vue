<template>
  <div
    class="w-full text-center font-bold border-[2px] rounded-full"
    :class="tagClass"
    @click="onClick"
  >
    {{ option.label }}
  </div>
</template>
<script lang="ts" setup>
import { POKEMON_REGIONS, POKEMON_TYPES } from "~/constants";
import type { ButtonMode } from "~/types/button";

const props = defineProps<{
  type: "region" | "type";
  option: (typeof POKEMON_TYPES)[number] | (typeof POKEMON_REGIONS)[number];
  mode: ButtonMode;
}>();

const tagClass = computed(() => {
  const { mode, type, option } = props;
  if (type === "region") {
    if (mode === "solid") {
      return `bg-white text-black`;
    }
    if (mode === "outline") {
      return `text-white border-white`;
    }
  } else {
    if (mode === "solid") {
      return `bg-poke-${option.value} text-white`;
    }
    if (mode === "outline") {
      return `text-poke-${option.value} border-poke-${option.value}`;
    }
  }
});
const onClick = (e: any) => {
  console.log("onClick:", e);
};
</script>
