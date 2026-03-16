<template>
  <div>
    <div class="start">
      <PokemonBall
        v-for="(item, index) in leftWings"
        :key="index"
        class="poke-node"
      />
    </div>
    <div class="center abs-center">
      <PokemonBall class="w-[200px] h-[200px]" :is-main="true" />
    </div>
    <div class="end">
      <PokemonBall
        v-for="(item, index) in rightWings"
        :key="index"
        class="poke-node"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import PokemonBall from "./PokemonBall.vue";
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D"];
const leftWings = array.slice(0, 6);
const centerItem = array[6];
const rightWings = array.slice(7, 13);
</script>
<style lang="scss" scoped>
/* 基礎節點設定 */
.poke-node {
  position: absolute;
  transform: translate(-50%, -50%); // 讓座標對準球的中心點
  transition: transform 0.3s ease; // 讓 hover 時有縮放的彈性

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

/* 左邊 6 顆的專屬座標 (X, Y) */
.start {
  .poke-node:nth-child(1) {
    left: 15%;
    top: 45%;
  } // 最外側
  .poke-node:nth-child(2) {
    left: 25%;
    top: 25%;
  } // 上排外
  .poke-node:nth-child(3) {
    left: 25%;
    top: 65%;
  } // 下排外
  .poke-node:nth-child(4) {
    left: 38%;
    top: 20%;
  } // 上排內
  .poke-node:nth-child(5) {
    left: 35%;
    top: 75%;
  } // 下排內
  .poke-node:nth-child(6) {
    left: 45%;
    top: 50%;
  } // 最靠近中間
}

/* 右邊 6 顆的專屬座標 (對稱左邊) */
.end {
  .poke-node:nth-child(1) {
    right: 15%;
    top: 45%;
  } // 注意這裡是 right
  .poke-node:nth-child(2) {
    right: 25%;
    top: 25%;
  }
  .poke-node:nth-child(3) {
    right: 25%;
    top: 65%;
  }
  .poke-node:nth-child(4) {
    right: 38%;
    top: 20%;
  }
  .poke-node:nth-child(5) {
    right: 35%;
    top: 75%;
  }
  .poke-node:nth-child(6) {
    right: 45%;
    top: 50%;
  }
}

/* 中間核心的發光設定 */
// .center-core {
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);

//   .ball-glow-wrapper {
//     box-shadow:
//       inset 0 0 20px 5px rgba(0, 210, 255, 0.5),
//       0 0 30px 5px rgba(0, 210, 255, 0.4);
//     animation: glow-breathe 3s ease-in-out infinite;
//   }
// }

// @keyframes glow-breathe {
//   0%,
//   100% {
//     transform: scale(1);
//     box-shadow: 0 0 20px rgba(0, 210, 255, 0.4);
//   }
//   50% {
//     transform: scale(1.05);
//     box-shadow: 0 0 40px rgba(0, 210, 255, 0.8);
//   }
// }
</style>
