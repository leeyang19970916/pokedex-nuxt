import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokeCard } from "../types/pokemon";

export const usePokeStore = defineStore("pokeStore", () => {
  const pokeList = ref<PokeCard[]>([]);
  const setList = async (newData: PokeCard[]) => {
    console.log(newData);
    pokeList.value = newData;
  };
  return { pokeList, setList };
});
