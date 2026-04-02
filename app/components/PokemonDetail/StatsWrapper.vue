<template>
  <div>
    <div class="hud-panel cosms-hud stats-bar-panel p-6 flex flex-col gap-4">
      <div class="label cosms-label">AURA ENERGY CELLS</div>

      <div class="flex flex-col gap-3 mt-2">
        <div
          v-for="(val, statName) in stats"
          :key="statName"
          class="flex items-center"
        >
          <div
            class="w-10 font-mono text-xs text-gray-400 uppercase tracking-wider"
          >
            {{
              statName === "spa" ? "SpA" : statName === "spd" ? "SpD" : statName
            }}
          </div>

          <div class="flex gap-1 flex-1 mx-3">
            <div
              v-for="n in 15"
              :key="n"
              class="h-3 w-full rounded-[2px] transition-all duration-300"
              :class="
                n <= Math.min(15, Math.ceil(val / 10))
                  ? 'bg-[#b3eafe] shadow-[0_0_8px_rgba(179,234,254,0.6)]'
                  : 'bg-[#1a2c3f] border border-[#2a3f54]'
              "
            ></div>
          </div>

          <div
            class="w-8 text-right font-mono text-sm font-bold primary-neon-text"
          >
            {{ val }}
          </div>
        </div>
      </div>
    </div>
    <div class="hud-panel cosms-hud entry-panel p-6 min-h-[200px]">
      <div class="label cosms-label mb-2">描述</div>
      <p class="value text-gray-200 font-mono text-sm leading-relaxed">
        {{ entryText }}
      </p>
    </div>

    <div class="hud-panel cosms-hud ability-panel p-6">
      <div class="label cosms-label mb-2">特性</div>
      <div class="flex flex-wrap gap-2">
        <Tag
          v-for="(ability, index) in abilityList"
          class="w-auto"
          :key="ability.label"
          :read-only="true"
          :mode="'outline'"
          :type="ABILITY"
          :option="ability"
        ></Tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
import { usePokeStore } from "~/store/pokeStore";
import Tag from "~/components/Tags/index.vue";
import { ABILITY } from "~/constants";
const props = defineProps<{
  stats: PokeDetailRes["stats"];
  abilities: PokeDetailRes["abilities"];
  entryText: PokeDetailRes["entryText"];
}>();

const store = usePokeStore();
const abilityList = computed(() => {
  return props.abilities.flatMap((enName) => {
    const data = store.abilities.find((item) => item.value === enName);
    console.log(data, "data");
    if (data && data.value !== undefined && data.id !== 0) {
      return [
        {
          value: data.value,
          label: data.label,
        },
      ];
    }
    return [];
  });
});
onMounted(() => {
  store.fetchAbilities();
});
</script>
