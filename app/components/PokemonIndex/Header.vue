<template>
  <div
    class="m-[0_auto] top-background h-[450px] relative overflow-hidden"
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
/* 給整個 Header 一個淡入保護罩，遮蔽載入初期的破圖 */
.top-background {
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-color: #0a141e;
  z-index: 10;

  /* 加上淡入動畫，0.5秒內從透明到出現 */
  animation: fade-in 0.5s ease-out forwards;
}

/* 只負責旋轉的 class */
.animation-spin {
  animation: spin 10s linear infinite;

  /* 效能優化：開啟硬體加速，防止旋轉時邊緣出現鋸齒或閃爍 */
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* 乾淨的旋轉 Keyframes (沒有 translate 來搗亂) */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 淡入 Keyframes */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
