<template>
  <div>
    <div class="hud-panel cosms-hud identity-panel p-6">
      <div class="label cosms-label">圖鑑編號</div>
      <div class="value font-bold text-5xl primary-neon-text mb-4">
        #{{ id }}
      </div>

      <div class="label cosms-label">名字</div>
      <div
        class="value font-extrabold text-4xl text-white mb-6 tracking-tighter"
      >
        {{ name.toUpperCase() }}
      </div>

      <div class="label cosms-label mb-2">屬性</div>
      <div class="flex gap-2 mb-6">
        <Tag
          v-for="options in typeOpts"
          type="type"
          mode="solid"
          :option="options"
        />
      </div>

      <div class="label cosms-label">分類</div>
      <div class="value text-white font-semibold mb-4">
        {{ "????" }}
      </div>
    </div>

    <div
      class="hud-panel cosms-hud basic-stats-panel p-6 grid grid-cols-2 gap-4 text-center"
    >
      <div>
        <div class="label cosms-label">HT</div>
        <div class="value text-white text-3xl font-extrabold">
          {{ height / 10 }} m
        </div>
      </div>
      <div>
        <div class="label cosms-label">WT</div>
        <div class="value text-white text-3xl font-extrabold">
          {{ weight / 10 }} kg
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
import Tag from "~/components/Tags/index.vue";
import { POKEMON_TYPES } from "~/constants";

const props = defineProps<{
  name: PokeDetailRes["name"];
  id: PokeDetailRes["id"];
  height: PokeDetailRes["height"];
  weight: PokeDetailRes["weight"];
  types: PokeDetailRes["types"];
}>();

const typeOpts = computed(() => {
  return POKEMON_TYPES.filter((opt) => {
    return props.types.includes(opt.value);
  });
});
</script>
