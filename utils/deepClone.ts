import { toRaw } from "vue";

export const deepClone = <T>(state: T): T => {
  return structuredClone(toRaw(state));
};
