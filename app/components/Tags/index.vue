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
type Option = (typeof POKEMON_TYPES)[number] | (typeof POKEMON_REGIONS)[number];

const props = defineProps<{
  type: "region" | "type";
  option: Option;
  mode: ButtonMode;
}>();
const emit = defineEmits<{
  (e: "click", option: Option): void;
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
      return `border-poke-${option.value}-400 bg-poke-${option.value}-500 text-white shadow-[0_0_.25em_.03em] shadow-poke-${option.value}-500`;
    }
    if (mode === "outline") {
      return `text-poke-${option.value}-400 border-poke-${option.value}-400`;
    }
  }
});
const onClick = () => {
  emit("click", props.option);
};
</script>
box-shadow: 0 0 .25em .03em #0094e5
