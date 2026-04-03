import type { PokeCard } from "../app/types/pokemon";
export const getIdText = (id: PokeCard["id"], idOnly: boolean = true) => {
  return `${idOnly ? "" : "NO."} ${String(id).padStart(4, "0")}`;
};
