<template>
  <div class="hud-panel cosms-hud moveset-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label">招式組合</div>
    <div class="moveset-table-container">
      <table class="moveset-table w-full text-left font-mono text-sm">
        <thead class="text-gray-500">
          <tr>
            <th>TYPE</th>
            <th>NAME</th>
            <th>CAT.</th>
            <th>POWER</th>
            <th>ACC.</th>
          </tr>
        </thead>
        <tbody class="text-white">
          <tr v-for="move in data" :key="move.name">
            <td>
              <span :class="['cosms-type-tag-small', move.type]">{{
                move.type.toUpperCase()
              }}</span>
            </td>
            <td>{{ move.name }}</td>
            <td>{{ move.cat }}</td>
            <td>{{ move.power }}</td>
            <td>{{ move.acc }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";

defineProps<{
  moves: PokeDetailRes["moves"];
}>();

const data = [
  {
    type: "fighting",
    name: "Close Combat",
    cat: "PHYS.",
    power: 120,
    acc: 100,
  },
  {
    type: "fighting",
    name: "Aura Sphere",
    cat: "SPEC.",
    power: 80,
    acc: 100,
  },
  { type: "steel", name: "Meteor Mash", cat: "PHYS.", power: 90, acc: 90 },
  { type: "dark", name: "Dark Pulse", cat: "SPEC.", power: 80, acc: 100 },
];
</script>
