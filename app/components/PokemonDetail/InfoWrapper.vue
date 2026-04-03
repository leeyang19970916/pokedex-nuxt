<template>
  <div>
    <div
      class="hud-panel cosms-hud identity-panel p-6 flex flex-col gap-6 pb-[4rem]"
    >
      <section class="flex flex-col gap-2">
        <div class="label cosms-label">圖鑑編號 [INDEX_NO]</div>
        <div class="value font-bold text-5xl primary-neon-text">
          {{ getIdText(id) }}
        </div>
      </section>
      <section class="flex flex-col gap-2">
        <div class="label cosms-label">名字 [NAME]</div>
        <div class="value font-extrabold text-4xl text-white tracking-tighter">
          {{ name.toUpperCase() }}
        </div>
      </section>

      <section class="flex flex-col gap-2" v-if="genus">
        <div class="label cosms-label">分類 [CATEGORY]</div>
        <div class="value text-white font-semibold">
          {{ genus }}
        </div>
      </section>

      <section class="flex flex-col gap-2" v-if="region">
        <div class="label cosms-label">地區 [REGION]</div>
        <div class="value text-white font-semibold">
          {{ region.label }}
        </div>
      </section>

      <section class="flex flex-col gap-2">
        <div class="label cosms-label">屬性 [TYPE]</div>
        <div class="flex gap-2">
          <Tag
            v-for="options in typeOpts"
            type="type"
            mode="solid"
            :option="options"
            :readOnly="false"
          />
        </div>
      </section>
      <section class="flex flex-col gap-2">
        <div class="label cosms-label">弱點 [WEAKNESS]</div>
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="options in weaknessOpts"
            class="!p-[3px] !w-[70px]"
            type="type"
            mode="solid"
            :option="options"
            :readOnly="false"
          />
        </div>
      </section>
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
import { POKEMON_TYPES, POKEMON_REGIONS } from "~/constants";
import { getIdText } from "~~/utils/getIdText";

const props = defineProps<{
  name: PokeDetailRes["name"];
  id: PokeDetailRes["id"];
  height: PokeDetailRes["height"];
  weight: PokeDetailRes["weight"];
  types: PokeDetailRes["types"];
  genus: PokeDetailRes["genus"];
  damageType: PokeDetailRes["damageType"];
  region: PokeDetailRes["region"];
}>();

const typeOpts = computed(() => {
  return POKEMON_TYPES.filter((opt) => props.types.includes(opt.value));
});

const weaknessOpts = computed(() => {
  const { double_damages, half_damages, no_damages } = props.damageType;
  const formatData = double_damages.filter(
    (item) => !half_damages.includes(item) && !no_damages.includes(item)
  );
  return POKEMON_TYPES.filter((opt) => formatData.includes(opt.value));
});

const region = computed(() =>
  POKEMON_REGIONS.find((i) => i.value === props.region)
);
</script>
