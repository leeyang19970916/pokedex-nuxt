<template>
  <div class="hud-panel cosms-hud evolution-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label text-cyan-400 font-mono tracking-widest">
      進化鏈數據 [EVOLUTION_FLOW]
    </div>

    <div
      class="evolution-chain-flow flex items-center justify-around w-full mt-4"
    >
      <div v-if="stageOnePokes.length" class="stage-block flex items-center">
        <div class="flex flex-col gap-4">
          <div
            v-for="poke in stageOnePokes"
            :key="poke.id"
            @click="redirect(poke.id)"
          >
            <EvoBall
              :name="poke.name"
              :image="poke.image"
              :active="currentPokeId === poke.id"
            />
          </div>
        </div>
        <div
          v-if="stageTwoPokes.length"
          class="arrow mx-6 text-cyan-900 text-2xl font-bold animate-pulse"
        >
          ≫
        </div>
      </div>

      <div v-if="stageTwoPokes.length" class="stage-block flex items-center">
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="poke in stageTwoPokes"
            :key="poke.id"
            @click="redirect(poke.id)"
          >
            <EvoBall
              :name="poke.name"
              :image="poke.image"
              :active="currentPokeId === poke.id"
            />
          </div>
        </div>
        <div
          v-if="stageThreePokes.length"
          class="arrow mx-6 text-cyan-900 text-2xl font-bold animate-pulse"
        >
          ≫
        </div>
      </div>

      <div v-if="stageThreePokes.length" class="stage-block">
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="poke in stageThreePokes"
            :key="poke.id"
            @click="redirect(poke.id)"
          >
            <EvoBall
              :name="poke.name"
              :image="poke.image"
              :active="currentPokeId === poke.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
// 注意：請確保路徑正確，且 PokedexData 是個陣列
import PokedexData from "~~/server/api/rawData/pokedex.json";
import EvoBall from "./EvoBall.vue";

const props = defineProps<{
  currentPokeId: PokeDetailRes["id"];
  evolutionChains: PokeDetailRes["evolutionChains"];
}>();

// 1. 先把原始資料轉成帶有圖片跟名字的完整物件陣列
const processedChains = computed(() => {
  if (!props.evolutionChains) return [];

  return props.evolutionChains
    .map((item) => {
      const poke = (PokedexData as any[]).find((data) => data.id === item.id);
      // 如果找不到資料，回傳 null 方便過濾
      if (!poke) return null;
      return {
        id: poke.id,
        name: poke.name,
        image: poke.image,
        stage: item.stage,
      };
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);
});

// 2. 依照 Stage 拆分（這樣 HTML 結構會非常乾淨）
const stageOnePokes = computed(() =>
  processedChains.value.filter((p) => p.stage === 1)
);
const stageTwoPokes = computed(() =>
  processedChains.value.filter((p) => p.stage === 2)
);
const stageThreePokes = computed(() =>
  processedChains.value.filter((p) => p.stage === 3)
);

const redirect = (id?: number) => {
  if (!id || props.currentPokeId === id) return;
  navigateTo(`/pokemon/${id}`);
};
</script>

<style scoped lang="scss">
.evolution-stage-block {
  @apply transition-transform duration-300;
}

.arrow {
  text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
  user-select: none;
}
</style>
