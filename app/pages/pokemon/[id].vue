<template>
  <div
    v-if="poke && data && status === 'success'"
    class="min-h-screen z-10"
    :style="{ 'background-image': `url(${BackgroundImage})` }"
  >
    <header
      class="terminal-banner cosms-border flex justify-between items-center h-20 relative overflow-hidden px-[3%]"
    >
      <div class="hologram-line z-0 absolute inset-0 pointer-events-none"></div>

      <div
        v-if="prevPoke"
        class="nav-btn prev-btn z-10 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105"
        @click="() => navigateTo(`/pokemon/${prevPoke?.id}`)"
      >
        <div class="nav-arrow text-cyan-500 font-bold text-xl">≪</div>
        <div class="nav-info hidden md:flex flex-col items-start">
          <span class="text-[10px] text-cyan-600 font-mono leading-none"
            >NO.{{ String(prevPoke.id).padStart(4, "0") }}</span
          >
          <span class="text-sm text-cyan-100 font-bold tracking-wider">{{
            prevPoke.name
          }}</span>
        </div>
      </div>
      <div v-else class="w-[120px]"></div>
      <div
        class="banner-content z-10 text-white font-mono tracking-widest text-2xl cursor-pointer text-center absolute left-1/2 -translate-x-1/2"
        @click="() => navigateTo({ path: '/' })"
      >
        {{ POKEDEX }}
      </div>

      <div
        v-if="nextPoke"
        class="nav-btn next-btn z-10 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105"
        @click="() => navigateTo(`/pokemon/${nextPoke?.id}`)"
      >
        <div class="nav-info hidden md:flex flex-col items-end">
          <span class="text-[10px] text-cyan-600 font-mono leading-none"
            >NO.{{ String(nextPoke.id).padStart(4, "0") }}</span
          >
          <span class="text-sm text-cyan-100 font-bold tracking-wider">{{
            nextPoke.name
          }}</span>
        </div>
        <div class="nav-arrow text-cyan-500 font-bold text-xl">≫</div>
      </div>
      <div v-else class="w-[120px]"></div>
    </header>
    <main class="relative grid grid-cols-[1fr_2fr_1fr] gap-6 z-10 p-[3%]">
      <InfoWrapper
        class="left-panel flex flex-col gap-6"
        :name="poke.name"
        :id="poke.id"
        :height="poke.height"
        :weight="poke.weight"
        :types="poke.types"
        :genus="poke.genus"
        :damageType="poke.damageType"
        :region="poke.region"
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
import { POKEDEX, SLIDER_RANGE } from "~/constants";
import PokedexData from "~~/server/api/rawData/pokedex.json";

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
const prevPoke = computed(() => {
  const index = Number(poke.value?.id) - 1;
  if (index === 0) return null;

  return PokedexData.find((i) => i.id === index);
});

const nextPoke = computed(() => {
  const index = Number(poke.value?.id) + 1;
  if (index <= SLIDER_RANGE.max) {
    return PokedexData.find((i) => i.id === index);
  }
  return null;
});
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
useHead({
  title: () => poke.value?.name,
});
</script>

<style lang="scss">
$box-shadow-neon: 0 0 15px rgba(179, 234, 254, 0.4);

.primary-border {
  border: 1px solid rgba(179, 234, 254, 0.6);
}

.cosms-border {
  border-bottom: 2px solid rgba(179, 234, 254, 0.6);
}

.primary-neon-text {
  color: #b3eafe; /* 你的主顏色 */
  text-shadow: 0 0 10px rgba(179, 234, 254, 0.8);
}

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

.cosms-hud {
  background-color: #101c29;
  border: 1px solid rgba(179, 234, 254, 0.6);
  box-shadow: $box-shadow-neon;
  position: relative;
  overflow: hidden;

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

.cosms-label {
  font-family: "Courier New", Courier, monospace;
  text-transform: uppercase;
  color: #6a7c8d;
}

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

.evo-ring-inner {
  position: absolute;
  width: 90%;
  height: 90%;
  border: 1px dashed rgba(179, 234, 254, 0.4);
  border-radius: 50%;
}
/* --- 導航列兩翼按鈕樣式 --- */
.nav-btn {
  background: rgba(10, 20, 30, 0.5); /* 微微的底色 */
  border: 1px solid transparent;
  padding: 4px 12px;
  border-radius: 8px;

  .nav-icon {
    /* 給小圖標一點立體投影 */
    filter: drop-shadow(0 0 5px rgba(179, 234, 254, 0.2));
    transition: filter 0.3s;
  }

  .nav-arrow {
    text-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
  }

  /* Hover 時的 HUD 啟動效果 */
  &:hover {
    border-color: rgba(179, 234, 254, 0.4);
    background: linear-gradient(
      90deg,
      rgba(179, 234, 254, 0.1) 0%,
      transparent 100%
    );
    box-shadow: inset 0 0 10px rgba(179, 234, 254, 0.1);

    .nav-icon {
      filter: drop-shadow(0 0 10px rgba(179, 234, 254, 0.6)) brightness(1.1);
    }

    .nav-arrow {
      text-shadow: 0 0 15px rgba(0, 243, 255, 0.9);
      transform: scale(1.2);
    }
  }

  /* 讓右邊按鈕的漸層反過來 */
  &.next-btn:hover {
    background: linear-gradient(
      270deg,
      rgba(179, 234, 254, 0.1) 0%,
      transparent 100%
    );
  }
}
</style>
