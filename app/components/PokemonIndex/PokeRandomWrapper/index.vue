<template>
  <div>
    <div class="start">
      <PokemonBall
        v-for="(item, index) in leftWings"
        :key="index"
        class="poke"
        :class="`start-${index}`"
      />
    </div>
    <div class="center abs-center">
      <PokemonBall class="w-[200px] h-[200px]" :is-main="true" />
    </div>
    <div class="end">
      <PokemonBall
        v-for="(item, index) in rightWings"
        :key="index"
        class="poke"
        :class="`end-${index}`"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import PokemonBall from "./PokeBall.vue";
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D"];
const leftWings = array.slice(0, 6);
const centerItem = array[6];
const rightWings = array.slice(7, 13);
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
