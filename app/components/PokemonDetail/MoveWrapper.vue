<template>
  <div class="hud-panel cosms-hud moveset-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label text-cyan-400">招式數據庫 [MOVESET_DATA]</div>

    <div class="moveset-table-wrapper">
      <el-table
        :data="moves"
        height="300"
        class="cosms-el-table w-full"
        :lazy="true"
      >
        <el-table-column
          fixed
          label="招式屬性"
          min-width="120"
          align="center"
          sortable
          prop="type"
        >
          <template #default="{ row }">
            <Tag
              class="custom-tag"
              :readOnly="true"
              :type="TYPE"
              :option="getTypeOpt(row.type)"
              mode="solid"
            />
          </template>
        </el-table-column>

        <el-table-column prop="name" label="招式名稱" min-width="120" sortable>
          <template #default="{ row }">
            <span class="font-bold text-gray-200 uppercase tracking-wide">{{
              row.name
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="招式類型"
          min-width="120"
          align="center"
          prop="category"
          sortable
        >
          <template #default="{ row }">
            <Tag
              class="custom-tag !px-0"
              :readOnly="true"
              :type="CATGEORY"
              :option="getStatusOpt(row.category)"
              mode="outline"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="power"
          label="攻擊力"
          min-width="120"
          align="center"
          sortable
        >
          <template #default="{ row }">
            <span class="text-orange-400 font-mono">{{ row.power }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="accuracy"
          label="命中率"
          min-width="120"
          align="center"
          sortable
        >
          <template #default="{ row }">
            <span class="text-cyan-400 font-mono">{{ row.accuracy }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";
import Tag from "~/components/Tags/index.vue";
import { POKEMON_TYPES, POKE_MOVE_CATS, TYPE, CATGEORY } from "~/constants";

defineProps<{
  moves: PokeDetailRes["moves"];
}>();

const getTypeOpt = (type: PokeDetailRes["types"][number]) => {
  return POKEMON_TYPES.find((t) => t.value === type) || POKEMON_TYPES[0];
};
const getStatusOpt = (status: PokeDetailRes["moves"][number]["category"]) => {
  return POKE_MOVE_CATS.find((m) => m.value === status) || POKE_MOVE_CATS[0];
};
</script>
<style scoped lang="scss">
.custom-tag {
  @apply w-3/4 m-[0_auto];
}
.moveset-table-wrapper {
  /* 讓 Element Plus 的背景完全透明，露出你的底層背景 */
  :deep(.cosms-el-table) {
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
    --el-table-header-bg-color: transparent;
    --el-table-border-color: rgba(255, 255, 255, 0.05); /* 極淡的線條 */
    --el-table-row-hover-bg-color: rgba(34, 211, 238, 0.1); /* 你的 Cyan 藍 */

    background-color: transparent;
    border: none;

    /* 標題欄樣式 */
    th.el-table__cell {
      @apply text-gray-500 font-mono tracking-widest text-xs border-b border-gray-800;
      background-color: transparent !important;
    }

    /* 內容單元格樣式 */
    td.el-table__cell {
      @apply py-2 border-none;
    }

    /* 移除 Element Plus 預設的偽元素邊框線 */
    &::before,
    &::after {
      display: none !important;
    }

    .el-table__inner-wrapper::before {
      display: none !important;
    }

    /* 自定義捲軸樣式 (讓它符合科幻風) */
    .el-scrollbar__bar {
      @apply opacity-50;
    }
  }

  /* 斑馬紋或間隔感（可選） */
  :deep(.el-table__row) {
    @apply transition-all duration-300;
    &:nth-child(even) {
      background-color: rgba(15, 23, 42, 0.2); /* 稍微深一點的背景色 */
    }
  }
}
</style>
