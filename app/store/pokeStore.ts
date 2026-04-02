import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokeCard, PokeAbility } from "../types/pokemon";

export const usePokeStore = defineStore("pokeStore", () => {
  const abilities = ref<PokeAbility[]>([]);
  const pokeList = ref<PokeCard[]>([]);
  const setList = async (newData: PokeCard[]) => {
    pokeList.value = newData;
  };
  const fetchAbilities = async () => {
    if (abilities.value.length) return;
    const res = await $fetch("/api/pokemon/ability/list", {
      query: {
        limit: 400,
      },
      immediate: true,
    });
    const all = { label: "All", value: undefined, id: 0 };
    abilities.value = [all, ...res];
  };
  return { pokeList, setList, abilities, fetchAbilities };
});
