<template>
  <div class="hud-panel cosms-hud evolution-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label text-cyan-400 font-mono tracking-widest">
      進化鏈數據 [EVOLUTION_FLOW]
    </div>

    <div
      class="evolution-chain-flow flex items-center justify-around w-full mt-4"
    >
      <template v-for="s in STAGES" :key="s">
        <div
          v-if="getStagePokes(s).length"
          class="stage-block flex items-center"
        >
          <div
            :class="[
              'grid gap-4',
              s === 1 ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3',
            ]"
          >
            <div
              v-for="poke in getStagePokes(s)"
              :key="poke.id"
              @click="redirect(poke.id)"
              class="cursor-pointer transition-transform hover:scale-110"
            >
              <EvoBall
                :name="poke.name"
                :image="poke.image"
                :active="currentPokeId === poke.id"
              />
              q
            </div>
          </div>

          <div
            v-if="s < 3 && getStagePokes(s + 1).length"
            class="arrow mx-6 text-cyan-900 text-2xl font-bold animate-pulse"
          >
            ≫
          </div>
        </div>
      </template>
    </div>
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

const pokedexMap = new Map(PokedexData.map((p) => [p.id, p]));

const processedChains = computed(() => {
  if (!props.evolutionChains) return [];

  return props.evolutionChains
    .map((item) => {
      const poke = pokedexMap.get(item.id);
      if (!poke) return null;
      return {
        ...poke,
        stage: item.stage,
      };
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);
});

const getStagePokes = (stage: number) => {
  return processedChains.value.filter((p) => p.stage === stage);
};

const redirect = (id?: number) => {
  if (!id || props.currentPokeId === id) return;
  navigateTo(`/pokemon/${id}`);
};
</script>
