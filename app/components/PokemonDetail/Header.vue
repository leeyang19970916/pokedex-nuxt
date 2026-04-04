<template>
  <header
    class="terminal-banner cosms-border flex justify-between items-center h-20 relative overflow-hidden px-[3%]"
  >
    <div class="hologram-line z-0 absolute inset-0 pointer-events-none"></div>

    <div
      v-if="prevPoke"
      class="nav-btn prev-btn z-10 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105"
      @click="() => navigateTo(`/pokemon/${prevPoke?.id}`)"
    >
      <div class="nav-arrow text-cyan-500 font-bold text-xl">≪</div>
      <div class="nav-info hidden md:flex flex-col items-start">
        <span class="text-[10px] text-cyan-600 font-mono leading-none">{{
          getIdText(prevPoke.id, false)
        }}</span>
        <span class="text-sm text-cyan-100 font-bold tracking-wider">{{
          prevPoke.name
        }}</span>
      </div>
    </div>
    <div v-else class="w-[120px]"></div>
    <div
      class="banner-content z-10 text-white font-mono tracking-widest text-2xl cursor-pointer text-center absolute left-1/2 -translate-x-1/2"
      @click="() => navigateTo({ path: '/' })"
    >
      {{ POKEDEX }}
    </div>

    <div
      v-if="nextPoke"
      class="nav-btn next-btn z-10 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105"
      @click="() => navigateTo(`/pokemon/${nextPoke?.id}`)"
    >
      <div class="nav-info hidden md:flex flex-col items-end">
        <span class="text-[10px] text-cyan-600 font-mono leading-none">{{
          getIdText(nextPoke.id, false)
        }}</span>
        <span class="text-sm text-cyan-100 font-bold tracking-wider">{{
          nextPoke.name
        }}</span>
      </div>
      <div class="nav-arrow text-cyan-500 font-bold text-xl">≫</div>
    </div>
    <div v-else class="w-[120px]"></div>
  </header>
</template>

<script setup lang="ts">
import { getIdText } from "~~/utils/getIdText";
import { POKEDEX, SLIDER_RANGE } from "~/constants";
import type { PokeDetailRes } from "~/types/pokeDetail";
import PokedexData from "~~/server/api/rawData/pokedex.json";

const props = defineProps<{
  id: PokeDetailRes["id"];
}>();

const prevPoke = computed(() => {
  const index = Number(props.id) - 1;
  if (index === 0) return null;

  return PokedexData.find((i) => i.id === index);
});

const nextPoke = computed(() => {
  const index = Number(props.id) + 1;
  if (index <= SLIDER_RANGE.max) {
    return PokedexData.find((i) => i.id === index);
  }
  return null;
});
</script>
