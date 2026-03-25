import { toRaw } from "vue";

export const deepClone = <T>(state: T): T => {
  // 深層拷貝，解構proxy，重新賦值
  return structuredClone(toRaw(state));
};
