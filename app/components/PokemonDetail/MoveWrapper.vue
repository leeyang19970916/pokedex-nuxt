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
            <th class="pb-2 pl-2">屬性(TYPE)</th>
            <th class="pb-2">招式名稱(Name)</th>
            <th class="pb-2 text-center">招式分類(Cat.)</th>
            <th class="pb-2 text-center">攻擊力(Power)</th>
            <th class="pb-2 text-center">命中率(Acc.)</th>
          </tr>
        </thead>

        <tbody class="text-white h-80px overflow-hidden scroll-m-0">
          <tr
            v-for="(move, index) in moves"
            :key="`${move.name}-${index}`"
            class="bg-slate-900/30 hover:bg-cyan-900/20 transition-colors group"
          >
            <td class="py-3 pl-2">
              <Tag
                :readOnly="true"
                :type="TYPE"
                :option="getTypeOpt(move.type)"
                :mode="'solid'"
              >
              </Tag>
            </td>
            <td class="font-bold text-gray-200">{{ move.name }}</td>
            <td class="text-center">
              <Tag
                :readOnly="true"
                class="!w-[80%] py-2 m-[0_auto]"
                :type="CATGEORY"
                :option="getStatusOpt(move.category)"
                :mode="'outline'"
              >
              </Tag>
            </td>
            <td class="text-center text-orange-400">{{ move.power }}</td>
            <td class="text-center text-cyan-400">{{ move.accuracy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
import Tag from "~/components/Tags/index.vue";
import { POKEMON_TYPES, POKE_MOVE_CATS, TYPE, CATGEORY } from "~/constants";

defineProps<{
  moves: PokeDetailRes["moves"];
}>();

const getTypeOpt = (type: PokeDetailRes["types"][number]) => {
  return POKEMON_TYPES.find((t) => t.value === type) || POKEMON_TYPES[0];
};
const getStatusOpt = (status: PokeDetailRes["moves"][number]["category"]) => {
  return POKE_MOVE_CATS.find((m) => m.value === status) || POKE_MOVE_CATS[0];
};
</script>
