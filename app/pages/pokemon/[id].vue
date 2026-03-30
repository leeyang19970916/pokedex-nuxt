<template>
  <div
    v-if="data && status === 'success'"
    class="pokedex-detail-terminal cosms-theme min-h-screen"
  >
    <header
      @click="() => execute()"
      class="terminal-banner cosms-border flex justify-center items-center h-20 relative overflow-hidden"
    >
      <div
        class="banner-content abs-center z-10 text-white font-mono tracking-widest text-2xl"
      >
        AURA ANALYZER - DETAIL VIEW
      </div>
      <div class="hologram-line z-0"></div>
    </header>

    <main
      class="main-display grid grid-cols-[1fr_2fr_1fr] gap-6 p-[3%] z-10 relative"
    >
      <InfoWrapper
        class="left-panel flex flex-col gap-6"
        :name="data.name"
        :id="data.id"
        :height="data.height"
        :weight="data.weight"
        :types="data.types"
      />

      <ImageWrapper
        class="center-feature cosms-feature relative flex justify-center items-center"
        :image="data.image"
        :name="data.name"
      />
      <StatsWrapper
        class="right-panel flex flex-col gap-6"
        :stats="data.stats"
        :abilities="data.abilities"
      />
    </main>

    <footer
      class="bottom-display p-[3%] pt-0 z-10 relative grid grid-cols-[1fr_2fr] gap-6"
    >
      <EvolutionWrapper />
      <MoveWrapper :moves="data.moves" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PokeCard } from "~/types/pokemon";
import InfoWrapper from "~/components/PokemonDetail/InfoWrapper.vue";
import ImageWrapper from "~/components/PokemonDetail/ImageWrapper.vue";
import StatsWrapper from "~/components/PokemonDetail/StatsWrapper.vue";
import MoveWrapper from "~/components/PokemonDetail/MoveWrapper.vue";
import EvolutionWrapper from "~/components/PokemonDetail/EvolutionWrapper.vue";
import type { PokeDetailRes } from "~/types/pokeDetail";
const route = useRoute();

const { data, status, execute } = await useFetch<PokeDetailRes>(
  () => `/api/pokemon/${route.params.id}`
);
</script>

<style lang="scss">
/* 詳情頁：能量分析終端 (微調版) */

.pokedex-detail-terminal {
  background-color: #0a141e; /* 你的標準深藍底色 */
  z-index: 10;
}

/* 霓虹藍光暈 (你的標準Box-Shadow - 使用 primary 色調) */
$box-shadow-neon: 0 0 15px rgba(179, 234, 254, 0.4); /* 使用 #b3eafe 的 RGBA 變體 */

/* --- 全域通用 Class (使用你提供的顏色) --- */
.primary-border {
  border: 1px solid rgba(179, 234, 254, 0.6);
}

.cosms-border {
  border-bottom: 2px solid rgba(179, 234, 254, 0.6);
}

/* 霓虹文字效果 (使用 primary 色調) */
.primary-neon-text {
  color: #b3eafe; /* 你的主顏色 */
  text-shadow: 0 0 10px rgba(179, 234, 254, 0.8);
}

/* --- 頂部標題與柔和全息效果 --- */
.terminal-banner {
  background-color: #0a141e;
  box-shadow: 0 5px 20px rgba(179, 234, 254, 0.2);

  .hologram-line {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 90%,
      rgba(179, 234, 254, 0.1) 95%,
      transparent 100%
    );
    background-size: 100% 20px;
    animation: hologram-scan 1s linear infinite;
  }
}

@keyframes hologram-scan {
  from {
    background-position-y: 0;
  }
  to {
    background-position-y: 20px;
  }
}

/* --- 進階 HUD 面板 (稜角分明與霓虹邊框 - 主色調) --- */
.cosms-hud {
  background-color: #101c29; /* 比底色稍微淺一點的面板色 */
  border: 1px solid rgba(179, 234, 254, 0.6);
  box-shadow: $box-shadow-neon;
  position: relative;
  overflow: hidden;

  /* HUD 面板切角效果 */
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    width: 20px;
    height: 20px;
    background-color: #0a141e;
    transform: rotate(45deg);
    z-index: 0;
  }
}

/* 文字標籤與數值 (Monospace 字體模擬終端) */
.cosms-label {
  font-family: "Courier New", Courier, monospace;
  text-transform: uppercase;
  color: #6a7c8d; /* 微調為更柔和的灰藍色，與底色更搭嘎 */
}

/* 能力值標籤 (雷達圖用) */
.cosms-stat-label {
  font-family: "Courier New", Courier, monospace;
  font-size: 10px;
  color: #b3eafe; /* 使用 primary 冰藍色 */
}

/* --- 屬性標籤 (使用你提供的特定 Type Tag 顏色) --- */
.cosms-type-tag {
  display: inline-block;
  padding: 4px 12px;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff; /* 保持白色文字，確保清晰 */
  text-transform: uppercase;
  border-radius: 4px; /* 這裡你原本是有點橢圓，可以調整 */

  /* 直接使用你提供的色卡數值 (Fighting = #dc6900, Steel = #aac8f0) */
  &.fighting {
    background-color: #dc6900;
  }
  &.steel {
    background-color: #aac8f0;
  }
  &.grass {
    background-color: #b4f000;
    color: #0a141e;
  } /* 草系顏色較亮，建議用深色字 */
  &.poison {
    background-color: #d28cd2;
  }
  &.dark {
    background-color: #787878;
  }
  /* 其他屬性你可以以此類推... */
}

.cosms-type-tag-small {
  @extend .cosms-type-tag;
  padding: 2px 8px;
  font-size: 10px;
}

/* --- 中央反應爐 (同心圓環反應爐 - 主色調脈衝) --- */
.reactor-core-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .core-ring {
    position: absolute;
    border: 2px solid rgba(179, 234, 254, 0.4);
    border-radius: 50%;
    z-index: 0;
  }

  /* 你的軌道設計：放大版 */
  .ring-1 {
    width: 300px;
    height: 300px;
  }
  .ring-2 {
    width: 350px;
    height: 350px;
    border-style: dashed;
  }
  .ring-3 {
    width: 400px;
    height: 400px;
    border-width: 1px;
  }
  .ring-4 {
    width: 450px;
    height: 450px;
    border-style: dotted;
  }
  .ring-5 {
    width: 500px;
    height: 500px;
    animation: reactor-pulse 10s linear infinite;
  }
}

@keyframes reactor-pulse {
  0%,
  100% {
    border-color: rgba(179, 234, 254, 0.2);
  }
  50% {
    border-color: rgba(179, 234, 254, 0.6);
  }
}

/* 寶可夢主圖 (柔和光暈) */
.pokemon-feature-img {
  width: 80%;
  max-width: 400px;
  height: auto;
  filter: drop-shadow(
    0 0 20px rgba(179, 234, 254, 0.5)
  ); /* 使用 primary 霓虹光暈 */
  animation: hologram-scanlines 5s ease-out forwards;
}

@keyframes hologram-scanlines {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* --- 雷達圖雛形 (色調與網格 gray-700) --- */
.radar-placeholder {
  .radar-web {
    position: absolute;
    width: 80%;
    height: 80%;
    border: 1px solid rgba(179, 234, 254, 0.1); /* 使用柔和的 primary 線條 */
    border-radius: 50%;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: -10px;
      right: -10px;
      height: 1px;
      background-color: rgba(179, 234, 254, 0.1);
    }
  }
  .stat-label {
    position: absolute;
  }
  .stat-hp {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .stat-atk {
    top: 30%;
    right: 10px;
  }
  .stat-def {
    bottom: 30%;
    right: 10px;
  }
  .stat-spe {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}

/* 進化鏈圓形圖示 inner ring */
.evo-ring-inner {
  position: absolute;
  width: 90%;
  height: 90%;
  border: 1px dashed rgba(179, 234, 254, 0.4);
  border-radius: 50%;
}

/* 招式列表表格樣式 (Primary 色調邊框) */
.moveset-table {
  thead th {
    padding: 12px;
    border-bottom: 2px solid rgba(179, 234, 254, 0.4);
  }
  tbody tr {
    border-bottom: 1px solid rgba(179, 234, 254, 0.1);
  }
  tbody tr:last-child {
    border-bottom: none;
  }
  tbody tr:hover {
    background-color: rgba(179, 234, 254, 0.03);
  }
  td {
    padding: 12px;
  }
}
</style>
