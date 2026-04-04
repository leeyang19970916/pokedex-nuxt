<template>
  <div
    class="m-[0_auto] top-background relative overflow-hidden h-[350px] md:h-[450px]"
    :style="{ 'background-image': `url(${TopBackground})` }"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-none pointer-events-none z-[1]"
    >
      <img
        class="w-full h-auto animation-spin"
        :src="AnimationBackground"
        alt=""
      />
    </div>

    <IndexWrapper class="absolute top-0 z-50"></IndexWrapper>
    <PokeImgRandomWrapper :list="props.list" />
  </div>
</template>

<script setup lang="ts">
import TopBackground from "~/assets/image/header/list_top_bg.png";
import AnimationBackground from "~/assets/image/header/animation_bg.png";
import IndexWrapper from "../IndexWrapper.vue";
import PokeImgRandomWrapper from "./PokeRandomWrapper/index.vue";
import type { PokeCard } from "~/types/pokemon";

const props = defineProps<{
  list: Pick<PokeCard, "id" | "image">[];
}>();
</script>

<style scoped lang="scss">
.top-background {
  @apply bg-cover bg-no-repeat;
  background-position: top;
  background-color: #0a141e;
  z-index: 10;
  animation: fade-in 0.5s ease-out forwards;
}

.animation-spin {
  animation: spin 10s linear infinite;
  backface-visibility: hidden;
  transform: translateZ(0);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
