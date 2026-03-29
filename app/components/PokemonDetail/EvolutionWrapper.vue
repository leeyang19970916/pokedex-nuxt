<template>
  <div class="hud-panel cosms-hud evolution-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label">EVOLUTION PATH</div>
    <div class="evolution-chain-flow flex items-center justify-around">
      <div
        v-for="(evo, index) in evolution"
        :key="evo.id"
        class="evolution-stage flex items-center gap-4"
      >
        <div
          class="evo-ball relative w-20 h-20 flex justify-center items-center rounded-full primary-border"
        >
          <img :src="evo.image" :alt="evo.name" class="w-16 h-16 z-10" />
          <div class="evo-ring-inner"></div>
        </div>
        <div
          v-if="index < evolution.length - 1"
          class="evo-arrow primary-neon-text text-3xl font-black"
        >
          ➔
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const evolution = [
  {
    id: 447,
    name: "Riolu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png",
  },
  {
    id: 448,
    name: "Lucario",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
  },
];
</script>
