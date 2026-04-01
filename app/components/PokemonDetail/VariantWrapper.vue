<template>
  <div class="flex gap-4 evolution-stage items-center">
    <div
      v-for="varity in varieties"
      :key="varity.id"
      class="evo-ball relative w-20 h-20 flex items-center justify-center border border-cyan-500 cursor-pointer rounded-full primary-border"
      :class="{ isActive: activeVariantId === varity.id }"
      @click="() => changeId(varity.id)"
    >
      <img
        class="w-[80%] h-[80%] z-10"
        :src="varity.image"
        :alt="varity.name"
      />
      <div class="evo-ring-inner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
import EvoBall from "./EvoBall.vue";

const props = defineProps<{
  varieties: PokeDetailRes["varieties"];
  activeVariantId: PokeDetailRes["id"];
}>();
const emit = defineEmits<{
  (e: "change", id: PokeDetailRes["id"]): void;
}>();

const changeId = (id: PokeDetailRes["id"]) => {
  if (props.activeVariantId === id) return;
  emit("change", id);
};
</script>

<style scoped>
.isActive {
  @apply bg-primary;
}
</style>
