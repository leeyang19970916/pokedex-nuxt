<template>
  <div
    class="m-[0_auto] min-w-[950px] max-w-[1400px] top-background h-[600px]"
    :style="{ 'background-image': `url(${TopBackground})` }"
  >
    <div class="animation-background">
      <img class="w-full" :src="AnimationBackground" alt="" />
    </div>
    <IndexWrapper class="absolute top-0 z-50"></IndexWrapper>
    <PokeImgRandomWrapper />
    <FilterWrapper class="absolute top-[67%]"></FilterWrapper>
  </div>
</template>
<script setup lang="ts">
import TopBackground from "~/assets/image/header/list_top_bg.jpg";
import AnimationBackground from "~/assets/image/header/animation_bg.png";
import IndexWrapper from "../IndexWrapper.vue";
import PokeImgRandomWrapper from "./PokeRandomWrapper/index.vue";
import FilterWrapper from "../FilterWrapper/index.vue";
</script>

<style scoped lang="scss">
.top-background {
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-color: #0a141e;
  position: relative;
  overflow: hidden;
  z-index: 10;
  .animation-background {
    position: absolute;
    z-index: 1; /* 確保在最底層 */

    /* 1. 定位：讓它在父容器正中央 */
    top: 50%;
    left: 50%;
    /* 這裡的大小建議設大一點，旋轉時才不會露出邊角 */
    width: 85%;
    max-width: none; // 防止被 Tailwind 或全域設定限制寬度

    /* 2. 動態定義：執行 rotate-anime，每 10 秒轉一圈 */
    animation: rotate-anime 10s linear infinite;

    /* 3. 初始位置：置中對齊 */
    transform: translate(-50%, -50%);
    pointer-events: none; // 讓滑鼠點擊可以穿過這張圖，點到下面的卡片
  }

  /* 確保標題和卡片在動畫圖層上面 */
  // :deep(.title-class), // 假設你的 Title 組件有 class
  // :deep(.pokemon-random-class) {
  //   position: relative;
  //   z-index: 10;
  // }
}

/* 4. 定義旋轉動畫 */
@keyframes rotate-anime {
  from {
    /* 必須帶上 translate 否則會失去置中效果 */
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
