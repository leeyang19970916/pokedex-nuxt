<template>
  <div
    v-if="poke && data && status === 'success'"
    class="min-h-screen z-10"
    :style="{ 'background-image': `url(${BackgroundImage})` }"
  >
    <header
      class="terminal-banner cosms-border flex justify-center items-center h-20 relative overflow-hidden"
    >
      <div
        class="banner-content abs-center z-10 text-white font-mono tracking-widest text-2xl cursor-pointer w-1/2 text-center"
        @click="() => navigateTo({ path: '/' })"
      >
        {{ POKEDEX }}
      </div>
      <div class="hologram-line z-0"></div>
    </header>
    <main class="relative grid grid-cols-[1fr_2fr_1fr] gap-6 z-10 p-[3%]">
      <InfoWrapper
        class="left-panel flex flex-col gap-6"
        :name="poke.name"
        :id="poke.id"
        :height="poke.height"
        :weight="poke.weight"
        :types="poke.types"
      />
      <section class="flex justify-center items-center">
        <ImageWrapper
          class="relative flex justify-center items-center"
          :image="poke.image"
          :name="poke.name"
        />
        <VariantWrapper
          class="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
          v-if="activeVariantId && poke.varieties.length > 1"
          :activeVariantId="activeVariantId"
          :varieties="poke.varieties"
          @change="change"
        />
      </section>
      <StatsWrapper
        class="right-panel flex flex-col gap-6"
        :stats="poke.stats"
        :abilities="poke.abilities"
        :entryText="poke.entryText"
      />
    </main>

    <footer class="z-10 relative grid grid-cols-[1fr_1.5fr] gap-6 p-[3%]">
      <EvolutionChainWrapper
        :currentPokeId="poke.id"
        :evolutionChains="poke.evolutionChains"
      />
      <MoveWrapper :moves="poke.moves" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import BackgroundImage from "~/assets/image/header/list_bottom_bg.jpg";
import InfoWrapper from "~/components/PokemonDetail/InfoWrapper.vue";
import ImageWrapper from "~/components/PokemonDetail/ImageWrapper.vue";
import StatsWrapper from "~/components/PokemonDetail/StatsWrapper.vue";
import MoveWrapper from "~/components/PokemonDetail/MoveWrapper.vue";
import EvolutionChainWrapper from "~/components/PokemonDetail/EvolutionChainWrapper.vue";
import type { PokeDetailRes } from "~/types/pokeDetail";
import VariantWrapper from "~/components/PokemonDetail/VariantWrapper.vue";
import { POKEDEX } from "~/constants";
const route = useRoute();

const { data, status } = await useFetch<PokeDetailRes>(
  () => `/api/pokemon/${route.params.id}`
);
const activeVariantId = ref<PokeDetailRes["id"] | null>(null);

const poke = ref<PokeDetailRes | null>(null);

const change = async (id: PokeDetailRes["id"]) => {
  const res = await $fetch<PokeDetailRes>(`/api/pokemon/variant/${id}`);
  if (poke.value && res) {
    poke.value.name = res.name;
    poke.value.height = res.height;
    poke.value.weight = res.weight;
    poke.value.abilities = res.abilities;
    poke.value.image = res.image;
    poke.value.stats = res.stats;
    poke.value.types = res.types;
    activeVariantId.value = res.id;
  }
};

watch(
  () => data,
  (newData) => {
    if (newData.value) {
      poke.value = structuredClone(toRaw(newData.value));
      activeVariantId.value = poke.value.id;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
/* 詳情頁：能量分析終端 (微調版) */

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
</style>
