<template>
  <div class="hud-panel cosms-hud evolution-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label text-cyan-400 font-mono tracking-widest">
      進化鏈數據 [EVOLUTION_FLOW]
    </div>
    <div class="h-full gap-4 grid" :class="[customClass.gridCol]">
      <template v-for="(pokeState, index) in pokeStates" :key="index">
        <div class="stage" v-if="pokeState.length">
          <EvoBall
            class="max-w-[200px] max-h-[200px]"
            :class="customClass.ballSize"
            v-for="poke in pokeState"
            :key="poke.id"
            :name="poke.name"
            :image="poke.image"
            @click="() => redirect(poke.id)"
          ></EvoBall>
        </div>
      </template>
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
  const result = stageChains.flatMap(({ id }) => {
    const data = PokedexData.find((poke) => poke.id === id);
    return data
      ? {
          id: data.id,
          name: data.name,
          image: data.image,
        }
      : [];
  });

  return result;
};

const pokeStates = computed(() => {
  let stage1 = getPokeDataList(1);
  let stage2 = getPokeDataList(2);
  let stage3 = getPokeDataList(3);

  return [stage1, stage2, stage3].filter((i) => i.length);
});

const customClass = computed(() => {
  const length = pokeStates.value.length;
  let result = {
    gridCol: "",
    ballSize: "",
  };
  if (length === 1) {
    result.gridCol = `grid-cols-1`;
    result.ballSize = "!w-full !h-full";
  } else if (length === 2) {
    const stage2Length = pokeStates.value[1]?.length;
    if (stage2Length && stage2Length > 1) {
      result.gridCol = `grid-cols-[2fr_8fr]`;
    } else {
      result.ballSize = "!w-full !h-full !max-w-[125px] !max-h-[125px]";
      result.gridCol = `grid-cols-[1fr_1fr]`;
    }
  } else {
    result.gridCol = `grid-cols-[1fr_1fr_1fr]`;
  }

  return result;
});

const redirect = (id?: number) => {
  if (!id || props.currentPokeId === id) return;
  navigateTo(`/pokemon/${id}`);
};
</script>

<style lang="scss" scoped>
.stage {
  @apply relative flex flex-wrap gap-4 items-center justify-center h-full px-4;

  &:not(:last-child)::after {
    content: "≫";
    position: absolute;
    right: -1.25rem;
    top: 50%;
    transform: translateY(-50%);

    @apply text-cyan-500 font-bold text-xl animate-pulse;
    z-index: 20;
    pointer-events: none;
  }
}
</style>
