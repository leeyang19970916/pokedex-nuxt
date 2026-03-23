import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokeCard } from "../types/pokemon";

export const usePokeStore = defineStore("pokeStore", () => {
  const abilities = ref<any[]>([]);
  const pokeList = ref<PokeCard[]>([]);
  const setList = async (newData: PokeCard[]) => {
    console.log(newData);
    pokeList.value = newData;
  };
  const setAbilities = async (newData: any) => {
    console.log(newData);
    abilities.value = newData;
  };
  return { pokeList, setList, abilities, setAbilities };
});
