import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokeCard, PokeAbility } from "../types/pokemon";

export const usePokeStore = defineStore("pokeStore", () => {
  const abilities = ref<PokeAbility[]>([]);
  const pokeList = ref<PokeCard[]>([]);
  const setList = async (newData: PokeCard[]) => {
    pokeList.value = newData;
  };
  const setAbilities = async (newData: PokeAbility[]) => {
    const all = { label: "All", value: undefined, id: 0 };

    abilities.value = [all, ...newData];
  };
  return { pokeList, setList, abilities, setAbilities };
});
