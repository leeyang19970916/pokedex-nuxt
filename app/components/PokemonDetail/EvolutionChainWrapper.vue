<template>
  <div class="hud-panel cosms-hud evolution-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label text-cyan-400 font-mono tracking-widest">
      進化鏈數據 [EVOLUTION_FLOW]
    </div>

    <div class="flex w-full flex-col gap-4">
      <div class="stage" v-if="pokeState.stage1.length">
        <EvoBall
          v-for="poke in pokeState.stage1"
          :key="poke.id"
          :name="poke.name"
          :image="poke.image"
        ></EvoBall>
      </div>
      <div class="stage" v-if="pokeState.stage2.length">
        <EvoBall
          v-for="poke in pokeState.stage2"
          :key="poke.id"
          :name="poke.name"
          :image="poke.image"
        ></EvoBall>
      </div>
      <div class="stage" v-if="pokeState.stage3.length">
        <EvoBall
          v-for="poke in pokeState.stage3"
          :key="poke.id"
          :name="poke.name"
          :image="poke.image"
        ></EvoBall>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
import PokedexData from "~~/server/api/rawData/pokedex.json";
import EvoBall from "./EvoBall.vue";

type PokeBaseInfo = Pick<PokeDetailRes, "id" | "image" | "name">;

const props = defineProps<{
  currentPokeId: PokeDetailRes["id"];
  evolutionChains: PokeDetailRes["evolutionChains"];
}>();

const getPokeDataList = (
  stage: PokeDetailRes["evolutionChains"][number]["stage"]
): PokeBaseInfo[] => {
  const stageChains = props.evolutionChains.filter((i) => i.stage === stage);
  const result = stageChains.map(({ id }) => {
    const data = PokedexData.find((poke) => poke.id === id);

    return data
      ? {
          id: data.id,
          name: data.name,
          image: data.image,
        }
      : undefined;
  });

  return result as PokeBaseInfo[];
};

const pokeState = computed(() => {
  let stage1 = getPokeDataList(1);
  let stage2 = getPokeDataList(2);
  let stage3 = getPokeDataList(3);

  return {
    stage1,
    stage2,
    stage3,
  };
});

const redirect = (id?: number) => {
  if (!id || props.currentPokeId === id) return;
  navigateTo(`/pokemon/${id}`);
};
</script>

<style lang="scss" scoped>
.stage {
  @apply flex flex-wrap gap-4 items-center justify-center;
}
</style>
