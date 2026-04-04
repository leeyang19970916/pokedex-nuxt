import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokedexCache, PokeAbility } from "../types/pokemon";
import AbilitiesRawData from "~~/server/api/rawData/abilities.json";

export const usePokeStore = defineStore("pokeStore", () => {
  const abilities = ref<PokeAbility[]>([]);
  const pokedexCache = ref<PokedexCache | null>(null);

  const setPokedexCache = (cache: PokedexCache | null) => {
    pokedexCache.value = cache;
  };

  const setAbilities = async () => {
    if (abilities.value.length) return;
    abilities.value = AbilitiesRawData.map((a) => {
      return { value: a.enName, label: a.chName };
    });
    const all = { label: "All", value: "all" };
    abilities.value = [all, ...abilities.value];
  };
  return { setAbilities, abilities, pokedexCache, setPokedexCache };
});
