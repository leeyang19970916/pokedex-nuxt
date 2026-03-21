<template>
  <div>
    <div class="start">
      <PokemonBall
        v-for="(poke, index) in list.slice(0, 6)"
        :key="`${poke.id}+${index}`"
        class="poke"
        :class="`start-${index}`"
        :poke
      />
    </div>
    <div class="center abs-center">
      <PokemonBall
        v-if="mainPoke"
        :poke="mainPoke"
        class="w-[200px] h-[200px]"
        :is-main="true"
      />
    </div>
    <div class="end">
      <PokemonBall
        v-for="(poke, index) in list.slice(7, 13)"
        :key="`${poke.id}+${index}`"
        class="poke"
        :class="`end-${index}`"
        :poke
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PokeCard } from "~/types/pokemon";
import PokemonBall from "./PokeBall.vue";

const props = defineProps<{
  list: Pick<PokeCard, "id" | "image">[];
}>();
const mainPoke = computed(() => props.list[6]);
</script>
<style lang="scss" scoped>
.poke {
  @apply absolute w-[100px] h-[100px];
}
.start {
  .start-0 {
    top: 40%;
    left: 5%;
  } // 最外側
  .start-1 {
    top: 30%;
    left: 13.5%;
  } // 上排外
  .start-2 {
    top: 51%;
    left: 13.5%;
  } // 下排外
  .start-3 {
    top: 40%;
    left: 22%;
  } // 上排內
  .start-4 {
    top: 30%;
    left: 30.5%;
  } // 下排內
  .start-5 {
    top: 51%;
    left: 30.5%;
  } // 最靠近中間
}

.end {
  .end-0 {
    top: 40%;
    right: 5%;
  } // 最外側
  .end-1 {
    top: 30%;
    right: 13.5%;
  } // 上排外
  .end-2 {
    top: 51%;
    right: 13.5%;
  } // 下排外
  .end-3 {
    top: 40%;
    right: 22%;
  } // 上排內
  .end-4 {
    top: 30%;
    right: 30.5%;
  } // 下排內
  .end-5 {
    top: 51%;
    right: 30.5%;
  } // 最靠近中間
}
</style>
