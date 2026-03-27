<template>
  <div class="pokedex-detail-terminal cosms-theme min-h-screen">
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
      <aside class="left-panel flex flex-col gap-6">
        <div class="hud-panel cosms-hud identity-panel p-6">
          <div class="label cosms-label">ID</div>
          <div class="value font-bold text-5xl primary-neon-text mb-4">
            #{{ mockPokemon.id }}
          </div>

          <div class="label cosms-label">NAME</div>
          <div
            class="value font-extrabold text-4xl text-white mb-6 tracking-tighter"
          >
            {{ mockPokemon.name.toUpperCase() }}
          </div>

          <div class="label cosms-label mb-2">TYPE</div>
          <div class="flex gap-2 mb-6">
            <span
              v-for="type in mockPokemon.types"
              :key="type"
              :class="['cosms-type-tag', type]"
            >
              {{ type.toUpperCase() }}
            </span>
          </div>

          <div class="label cosms-label">SPECIES</div>
          <div class="value text-white font-semibold mb-4">
            {{ mockPokemon.species }}
          </div>
        </div>

        <div
          class="hud-panel cosms-hud basic-stats-panel p-6 grid grid-cols-2 gap-4 text-center"
        >
          <div>
            <div class="label cosms-label">HT</div>
            <div class="value text-white text-3xl font-extrabold">
              {{ mockPokemon.height }} m
            </div>
          </div>
          <div>
            <div class="label cosms-label">WT</div>
            <div class="value text-white text-3xl font-extrabold">
              {{ mockPokemon.weight }} kg
            </div>
          </div>
        </div>
      </aside>

      <section
        class="center-feature cosms-feature relative flex justify-center items-center"
      >
        <div class="reactor-core-wrapper">
          <div
            v-for="i in 5"
            :key="i"
            :class="['core-ring', `ring-${i}`, 'primary-border']"
          ></div>
        </div>

        <img
          :src="mockPokemon.image"
          :alt="mockPokemon.name"
          class="pokemon-feature-img z-10"
        />
      </section>

      <aside class="right-panel flex flex-col gap-6">
        <div
          class="hud-panel cosms-hud stats-radar-panel p-6 flex flex-col items-center"
        >
          <div class="label cosms-label self-start mb-4">
            AURA PROFILE (RADAR)
          </div>
          <div
            class="radar-placeholder flex justify-center items-center w-60 h-60 relative border border-gray-700 rounded-full"
          >
            <div class="radar-web z-0"></div>
            <div
              class="radar-data z-10 flex justify-center items-center font-bold text-xl primary-neon-text"
            >
              AURA CHART
            </div>
            <div class="stat-label stat-hp cosms-stat-label">
              HP:{{ mockPokemon.stats.hp }}
            </div>
            <div class="stat-label stat-atk cosms-stat-label">
              Atk:{{ mockPokemon.stats.atk }}
            </div>
            <div class="stat-label stat-def cosms-stat-label">
              Def:{{ mockPokemon.stats.def }}
            </div>
            <div class="stat-label stat-spe cosms-stat-label">
              Spe:{{ mockPokemon.stats.spe }}
            </div>
          </div>
        </div>
        <div
          class="hud-panel cosms-hud stats-bar-panel p-6 flex flex-col gap-4"
        >
          <div class="label cosms-label">AURA ENERGY CELLS</div>

          <div class="flex flex-col gap-3 mt-2">
            <div
              v-for="(val, statName) in mockPokemon.stats"
              :key="statName"
              class="flex items-center"
            >
              <div
                class="w-10 font-mono text-xs text-gray-400 uppercase tracking-wider"
              >
                {{
                  statName === "spa"
                    ? "SpA"
                    : statName === "spd"
                      ? "SpD"
                      : statName
                }}
              </div>

              <div class="flex gap-1 flex-1 mx-3">
                <div
                  v-for="n in 15"
                  :key="n"
                  class="h-3 w-full rounded-[2px] transition-all duration-300"
                  :class="
                    n <= Math.min(15, Math.ceil(val / 10))
                      ? 'bg-[#b3eafe] shadow-[0_0_8px_rgba(179,234,254,0.6)]'
                      : 'bg-[#1a2c3f] border border-[#2a3f54]'
                  "
                ></div>
              </div>

              <div
                class="w-8 text-right font-mono text-sm font-bold primary-neon-text"
              >
                {{ val }}
              </div>
            </div>
          </div>
        </div>
        <div class="hud-panel cosms-hud entry-panel p-6">
          <div class="label cosms-label mb-2">POKEDEX ENTRY</div>
          <p class="value text-gray-200 font-mono text-sm leading-relaxed">
            {{ mockPokemon.entry }}
          </p>
        </div>

        <div class="hud-panel cosms-hud ability-panel p-6">
          <div class="label cosms-label mb-2">ABILITIES</div>
          <div class="flex gap-2">
            <span
              v-for="ability in mockPokemon.abilities"
              :key="ability"
              class="ability-tag font-mono text-xs p-2 border border-gray-700"
            >
              {{ ability.toUpperCase() }}
            </span>
          </div>
        </div>
      </aside>
    </main>

    <footer
      class="bottom-display p-[3%] pt-0 z-10 relative grid grid-cols-[1fr_2fr] gap-6"
    >
      <div class="hud-panel cosms-hud evolution-panel p-6 flex flex-col gap-4">
        <div class="label cosms-label">EVOLUTION PATH</div>
        <div class="evolution-chain-flow flex items-center justify-around">
          <div
            v-for="(evo, index) in mockPokemon.evolution"
            :key="evo.id"
            class="evolution-stage flex items-center gap-4"
          >
            <div
              class="evo-ball relative w-20 h-20 flex justify-center items-center rounded-full primary-border"
            >
              <img :src="evo.image" :alt="evo.name" class="w-16 h-16 z-10" />
              <div class="evo-ring-inner"></div>
            </div>
            <div
              v-if="index < mockPokemon.evolution.length - 1"
              class="evo-arrow primary-neon-text text-3xl font-black"
            >
              ➔
            </div>
          </div>
        </div>
      </div>

      <div class="hud-panel cosms-hud moveset-panel p-6 flex flex-col gap-4">
        <div class="label cosms-label">MOVESET</div>
        <div class="moveset-table-container">
          <table class="moveset-table w-full text-left font-mono text-sm">
            <thead class="text-gray-500">
              <tr>
                <th>TYPE</th>
                <th>NAME</th>
                <th>CAT.</th>
                <th>POWER</th>
                <th>ACC.</th>
              </tr>
            </thead>
            <tbody class="text-white">
              <tr v-for="move in mockPokemon.moves" :key="move.name">
                <td>
                  <span :class="['cosms-type-tag-small', move.type]">{{
                    move.type.toUpperCase()
                  }}</span>
                </td>
                <td>{{ move.name }}</td>
                <td>{{ move.cat }}</td>
                <td>{{ move.power }}</td>
                <td>{{ move.acc }}%</td>
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PokeCard } from "~/types/pokemon";
const route = useRoute();
const { data, status, pending, execute } = await useFetch(
  "/api/pokemon/fetchPokeInfo",
  {
    query: {
      id: route.params.id,
    },
  },
);
// ...之前的資料定義與 Riolu, Lucario 假資料保持不變...
// 我這裡省略假資料的定義程式碼，你可以沿用原本的，或者直接覆蓋新的。

interface EvolutionStage extends Pick<PokeCard, "id" | "name" | "image"> {}
interface PokemonDetail extends Omit<PokeCard, "abilities" | "region"> {
  species: string;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  entry: string;
  abilities: string[];
  moves: {
    type: string;
    name: string;
    cat: string;
    power: number;
    acc: number;
  }[];
  evolution: EvolutionStage[];
}

const mockPokemon = ref<PokemonDetail>({
  id: 448,
  name: "Lucario",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
  types: ["fighting", "steel"],
  species: "Aura Pokémon",
  height: 1.2,
  weight: 54.0,
  stats: {
    hp: 70,
    atk: 110,
    def: 70,
    spa: 115,
    spd: 70,
    spe: 90,
  },
  entry:
    "By catching the aura emanating from others, it can read their thoughts and movements.",
  abilities: ["steadfast", "inner focus"],
  moves: [
    {
      type: "fighting",
      name: "Close Combat",
      cat: "PHYS.",
      power: 120,
      acc: 100,
    },
    {
      type: "fighting",
      name: "Aura Sphere",
      cat: "SPEC.",
      power: 80,
      acc: 100,
    },
    { type: "steel", name: "Meteor Mash", cat: "PHYS.", power: 90, acc: 90 },
    { type: "dark", name: "Dark Pulse", cat: "SPEC.", power: 80, acc: 100 },
  ],
  evolution: [
    {
      id: 447,
      name: "Riolu",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png",
    },
    {
      id: 448,
      name: "Lucario",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
    },
  ],
});
</script>

<style scoped lang="scss">
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
