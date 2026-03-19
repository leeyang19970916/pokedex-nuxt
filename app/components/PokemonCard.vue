<template>
  <div class="relative z-100">
    <img :src="PokemonCard" alt="" class="w-full" />
    <img class="absolute w-[60%] left-[20%] top-[8%]" :src="Fake" alt="" />
    <span class="poke-id">0001</span>
    <span class="poke-name">妙挖種子</span>
    <div class="poke_tags flex gap-2 justify-between items-center">
      <Tag
        class="w-full"
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
  @apply w-[80%] absolute left-[10%] top-[58%] text-primary text-xl;
}
.poke-name {
  @apply w-[80%] absolute left-[10%] top-[64%] text-white text-2xl;
}
.poke_tags {
  @apply w-[80%] absolute left-[10%] bottom-[5%] text-lg;
}
</style>
