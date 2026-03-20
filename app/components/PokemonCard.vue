<template>
  <div class="relative z-100" @click="redirect">
    <img :src="PokemonCard" alt="" class="w-full" />
    <img
      class="absolute w-[60%] left-[20%] top-[8%]"
      :src="poke.image"
      alt=""
    />
    <span class="poke-id">{{ poke.id }}</span>
    <span class="poke-name">{{ poke.name }}</span>
    <div class="poke_tags flex gap-2 justify-between items-center">
      <Tag
        class="!w-1/2 !cursor-auto"
        v-for="(option, index) in typeOption"
        :key="`${option.value}-${index}`"
        :mode="'solid'"
        :type="'type'"
        :option="option"
      ></Tag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import PokemonCard from "~/assets/image/card_bg.png";
import Tag from "~/components/Tags/index.vue";
import { POKEMON_TYPES } from "~/constants";
import type { PokeCard } from "~/types/pokemon";

const props = defineProps<{
  poke: PokeCard;
}>();
const typeOption = computed(() => {
  const targetType = new Set(props.poke.types);
  return POKEMON_TYPES.filter((i) => targetType.has(i.value));
});

const redirect = () => {
  const id = props.poke.id;
  navigateTo({
    path: `/pokemon/${id}`,
  });
};
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
