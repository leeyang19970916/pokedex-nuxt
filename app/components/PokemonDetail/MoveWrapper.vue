<template>
  <div class="hud-panel cosms-hud moveset-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label text-cyan-400">招式數據庫 [MOVESET_DATA]</div>

    <div class="moveset-table-container overflow-x-auto">
      <table
        class="moveset-table w-full text-left font-mono text-xs border-separate border-spacing-y-2"
      >
        <thead
          class="text-gray-500 uppercase tracking-widest border-b border-gray-800"
        >
          <tr>
            <th class="pb-2 pl-2">Type</th>
            <th class="pb-2">Name</th>
            <th class="pb-2 text-center">Cat.</th>
            <th class="pb-2 text-center">Power</th>
            <th class="pb-2 text-center">Acc.</th>
            <th class="pb-2 text-right pr-2">Method</th>
          </tr>
        </thead>
        {{
          move
        }}
        <!-- <tbody class="text-white">
          <tr
            v-for="move in 5"
            :key="move.name"
            class="bg-slate-900/30 hover:bg-cyan-900/20 transition-colors group"
          >
            <td class="py-3 pl-2">
              <span :class="['type-tag-mini', move.type]">{{ move.type }}</span>
            </td>
            <td class="font-bold text-gray-200">{{ move.name }}</td>
            <td class="text-center">
              <span class="text-[10px] px-1 border border-gray-700 rounded">{{
                move.cat
              }}</span>
            </td>
            <td class="text-center text-orange-400">{{ move.power }}</td>
            <td class="text-center text-cyan-400">{{ move.acc }}</td>
            <td class="text-right pr-2 text-gray-400 italic">
              {{ move.method }}
            </td>
          </tr>
        </tbody> -->
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";

defineProps<{
  move: PokeDetailRes["moves"];
}>();
</script>
