<template>
  <div class="flex gap-4 evolution-stage items-center">
    <EvoBall
      v-for="varity in varieties"
      :key="varity.id"
      :name="varity.name"
      :image="varity.image"
      :class="{ isActive: activeVariantId === varity.id }"
      @click="() => changeId(varity.id)"
    ></EvoBall>
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
