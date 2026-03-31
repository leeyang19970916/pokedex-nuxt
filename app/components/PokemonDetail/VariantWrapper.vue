<template>
  <div class="flex gap-4">
    <div
      v-for="varity in varieties"
      :key="varity.id"
      class="w-[50px] h-[50px] flex items-center justify-center border border-cyan-500 cursor-pointer"
      :class="{ isActive: activeVariantId === varity.id }"
      @click="() => changeId(varity.id)"
    >
      <img :src="varity.image" :alt="varity.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";

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
