<template>
  <div
    class="relative delay-150 cursor-pointer"
    :class="{ 'ball-glow-wrapper': isMain }"
    @click="redirect"
  >
    <img
      :class="{ 'border rounded-full': isMain }"
      :src="PokemonBallImg"
      alt=""
    />
    <img class="abs-center w-[80%] h-[80%]" :src="poke.image" alt="" />
  </div>
</template>
<script setup lang="ts">
import PokemonBallImg from "~/assets/image/header/pokemon_ball_bg.png";
import type { PokeCard } from "~/types/pokemon";
const props = withDefaults(
  defineProps<{
    isMain?: boolean;
    poke: PokeCard;
  }>(),
  {
    isMain: false,
  }
);

const redirect = () => {
  const id = props.poke.id;
  navigateTo({
    path: `/pokemon/${id}`,
  });
};
</script>
<style>
.ball-glow-wrapper {
  @apply rounded-full;
  box-shadow:
    /* 1. 內層光暈 (讓球邊緣亮起來) - inset */ inset 0 0 10px 2px
      hsla(191, 100%, 50%, 0.4),
    /* 2. 外層光暈 (渲染出氣氛) */ 0 0 15px 1px rgba(0, 210, 255, 0.3);

  /* 輔助特效：讓整個東西看起來在發光 */
  filter: drop-shadow(0 0 3px hsl(191, 100%, 50%));

  /* 讓它浮動一下增加動感 */
  animation: glow-float 4s ease-in-out infinite;
}
@keyframes glow-float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.02);
  }
}
</style>
