import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokeCard, PokeAbility } from "../types/pokemon";
import AbilitiesRawData from "~~/server/api/rawData/abilities.json";

export const usePokeStore = defineStore("pokeStore", () => {
  const abilities = ref<PokeAbility[]>([]);
  // const pokeList = ref<PokeCard[]>([]);
  // const setList = async (newData: PokeCard[]) => {
  //   pokeList.value = newData;
  // };

  const setAbilities = async () => {
    if (abilities.value.length) return;
    abilities.value = AbilitiesRawData.map((a) => {
      return { value: a.enName, label: a.chName };
    });
    const all = { label: "All", value: "all" };
    abilities.value = [all, ...abilities.value];
  };
  return { setAbilities, abilities };
});
