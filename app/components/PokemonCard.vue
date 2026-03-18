<template>
  <div class="relative z-100">
    <img :src="PokemonCard" alt="" />
    <img class="absolute w-[60%] left-[20%] top-[8%]" :src="Fake" alt="" />
    <span class="poke-id">0001</span>
    <span class="poke-name">妙挖種子</span>
    <div class="poke_tags flex gap-4 justify-between items-center">
      <Tag
        v-for="(opt, index) in fakeArr"
        :key="index"
        :mode="'solid'"
        :type="'type'"
        :option="opt"
      ></Tag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import PokemonCard from "~/assets/image/card_bg.png";
import Fake from "~/assets/image/fake_pokemon.png";
import Tag from "~/components/Tags/index.vue";
import { POKEMON_TYPES } from "~/constants";
const fakeArr = POKEMON_TYPES.slice(0, 2);
</script>
<style lang="scss" scoped>
.poke-id {
  @apply w-[80%] absolute left-[10%] top-[57%] text-primary text-[1.6vw];
}
.poke-name {
  @apply w-[80%] absolute left-[10%] top-[62%] text-white text-[2.2vw];
}
.poke_tags {
  @apply w-[80%] absolute left-[10%] bottom-[5%] text-[1.2vw];
}
</style>
