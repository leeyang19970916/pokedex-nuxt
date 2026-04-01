<template>
  <div class="hud-panel cosms-hud evolution-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label text-cyan-400 font-mono tracking-widest">
      進化鏈數據 [EVOLUTION_FLOW]
    </div>

    <div class="flex w-full"></div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
import PokedexData from "~~/server/api/rawData/pokedex.json";
import EvoBall from "./EvoBall.vue";

const STAGES = [1, 2, 3];

const props = defineProps<{
  currentPokeId: PokeDetailRes["id"];
  evolutionChains: PokeDetailRes["evolutionChains"];
}>();
console.log(props.evolutionChains, "eee");

const redirect = (id?: number) => {
  if (!id || props.currentPokeId === id) return;
  navigateTo(`/pokemon/${id}`);
};
</script>
