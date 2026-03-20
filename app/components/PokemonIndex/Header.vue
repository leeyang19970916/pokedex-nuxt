<template>
  <div
    class="m-[0_auto] top-background h-[450px] relative overflow-hidden"
    :style="{ 'background-image': `url(${TopBackground})` }"
  >
    <div class="abs-center animation-background">
      <img class="w-full" :src="AnimationBackground" alt="" />
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
  list: PokeCard[];
}>();
</script>

<style scoped lang="scss">
.top-background {
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-color: #0a141e;
  z-index: 10;
  .animation-background {
    z-index: 1; /* 確保在最底層 */

    /* 這裡的大小建議設大一點，旋轉時才不會露出邊角 */
    width: 85%;
    max-width: none; // 防止被 Tailwind 或全域設定限制寬度

    /* 2. 動態定義：執行 rotate-anime，每 10 秒轉一圈 */
    animation: rotate-anime 10s linear infinite;

    /* 3. 初始位置：置中對齊 */
    pointer-events: none; // 讓滑鼠點擊可以穿過這張圖，點到下面的卡片
  }
}

/* 4. 定義旋轉動畫 */
@keyframes rotate-anime {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
