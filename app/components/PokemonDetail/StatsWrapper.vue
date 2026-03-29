<template>
  <div>
    <div
      class="hud-panel cosms-hud stats-radar-panel p-6 flex flex-col items-center"
    >
      <div class="label cosms-label self-start mb-4">AURA PROFILE (RADAR)</div>
      <div
        class="radar-placeholder flex justify-center items-center w-60 h-60 relative border border-gray-700 rounded-full"
      >
        <div class="radar-web z-0"></div>
        <div
          class="radar-data z-10 flex justify-center items-center font-bold text-xl primary-neon-text"
        >
          AURA CHART
        </div>
        <div class="stat-label stat-hp cosms-stat-label">HP:{{ stats.hp }}</div>
        <div class="stat-label stat-atk cosms-stat-label">
          Atk:{{ stats.atk }}
        </div>
        <div class="stat-label stat-def cosms-stat-label">
          Def:{{ stats.def }}
        </div>
        <div class="stat-label stat-spe cosms-stat-label">
          Spe:{{ stats.spe }}
        </div>
      </div>
    </div>
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
    <div class="hud-panel cosms-hud entry-panel p-6">
      <div class="label cosms-label mb-2">POKEDEX ENTRY</div>
      <p class="value text-gray-200 font-mono text-sm leading-relaxed">
        <!-- {{ mockPokemon.entry }} -->
        {{ "????" }}
      </p>
    </div>

    <div class="hud-panel cosms-hud ability-panel p-6">
      <div class="label cosms-label mb-2">ABILITIES</div>
      <div class="flex gap-2">
        <span
          v-for="ability in abilities"
          :key="ability"
          class="ability-tag font-mono text-xs p-2 border border-gray-700"
        >
          {{ ability.toUpperCase() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";

defineProps<{
  stats: PokeDetailRes["stats"];
  abilities: PokeDetailRes["abilities"];
}>();
</script>
