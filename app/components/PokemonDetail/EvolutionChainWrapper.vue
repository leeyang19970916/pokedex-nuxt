<template>
  <div class="hud-panel cosms-hud evolution-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label">進化鏈</div>
    <div class="evolution-chain-flow flex items-center justify-around">
      <div
        v-for="(poke, index) in pokes"
        :key="poke?.id"
        class="evolution-stage flex items-center gap-4"
      >
        <div
          class="evo-ball relative w-20 h-20 flex justify-center items-center rounded-full primary-border"
        >
          <img :src="poke?.image" :alt="poke?.name" class="w-16 h-16 z-10" />
          <div class="evo-ring-inner"></div>
        </div>
        <div
          v-if="index < pokes.length - 1"
          class="evo-arrow primary-neon-text text-3xl font-black"
        >
          ➔
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
import PokedexData from "~~/server/api/data/pokedex.json";

const props = defineProps<{
  evolutionChainIds: PokeDetailRes["evolutionChainIds"];
}>();

const pokes = computed(() => {
  return props.evolutionChainIds.map((id) =>
    PokedexData.find((data) => data.id === id),
  );
});
</script>
