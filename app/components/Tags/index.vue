<template>
  <div
    class="w-[90px] py-1 text-center font-bold text-sm border-[2px] rounded-2xl transition-all cursor-pointer"
    :class="[tagClass, { ' px-4 rounded-md': props.type === 'region' }]"
    @click="onClick"
  >
    {{ option.label }}
  </div>
</template>
<script lang="ts" setup>
import type { ButtonMode } from "~/types/button";
import type { TagPayload } from "~/types/pokemon";

const props = defineProps<{
  type: TagPayload["type"];
  option: TagPayload["option"];
  mode: ButtonMode;
}>();
const emit = defineEmits<{
  (e: "click", { type, option }: TagPayload): void;
}>();

const tagClass = computed(() => {
  const { mode, type, option } = props;
  const lightColor = `poke-${option.value}-400`;
  const darkColor = `poke-${option.value}-500`;

  if (type === "region") {
    if (mode === "solid") {
      return `border-gray-600 bg-gray-400 text-white `;
    }
    if (mode === "outline") {
      return `border-gray-600 text-gray-400 hover:border-primary/60 hover:text-primary/80`;
    }
  } else {
    if (mode === "solid") {
      return `border-${lightColor} bg-${darkColor} text-white shadow-[0_0_.25em_.03em] shadow-${darkColor}`;
    }
    if (mode === "outline") {
      return `text-${lightColor} border-${lightColor} hover:border-${darkColor}  hover:bg-${darkColor} hover:text-white`;
    }
  }
});
const onClick = () => {
  const { type, option } = props;
  emit("click", { type, option });
};
</script>
