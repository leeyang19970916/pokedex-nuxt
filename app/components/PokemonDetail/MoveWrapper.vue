<template>
  <div class="hud-panel cosms-hud moveset-panel p-6 flex flex-col gap-4">
    <div class="label cosms-label text-cyan-400">招式數據庫 [MOVESET_DATA]</div>

    <div class="moveset-table-wrapper relative min-h-[300px]">
      <div
        v-if="isLoading"
        class="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-[2px] rounded-lg transition-opacity duration-300"
      >
        <NuxtImg
          :src="PokeBall"
          class="w-12 h-12 animate-spin opacity-80 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        />
        <span
          class="text-cyan-400 font-mono text-xs mt-3 tracking-widest animate-pulse"
        >
          獲取招式數據中...
        </span>
      </div>

      <el-table
        :data="displayMoves"
        height="300"
        class="cosms-el-table w-full transition-opacity duration-300"
        :class="{ 'opacity-30 pointer-events-none': isLoading }"
        :lazy="true"
      >
        <el-table-column
          label="招式屬性"
          min-width="120"
          align="center"
          sortable
          prop="type"
        >
          <template #default="{ row }">
            <Tag
              v-if="row.name"
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
            <span
              v-if="row.name"
              class="font-bold text-gray-200 uppercase tracking-wide"
              >{{ row.name }}</span
            >
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
              v-if="row.name"
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
            <span v-if="row.name" class="text-orange-400 font-mono">{{
              row.power
            }}</span>
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
            <span v-if="row.name" class="text-cyan-400 font-mono">{{
              row.accuracy
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { PokeDetailRes } from "~/types/pokeDetail";
import Tag from "~/components/Tags/index.vue";
import { POKEMON_TYPES, POKE_MOVE_CATS, TYPE, CATGEORY } from "~/constants";
import PokeBall from "~/assets/image/ball.svg";

const props = defineProps<{
  moves: PokeDetailRes["moves"];
}>();

const isLoading = ref(true);

const displayMoves = computed(() => {
  if (isLoading.value && (!props.moves || props.moves.length === 0)) {
    return Array(5).fill({});
  }
  return props.moves;
});

const getTypeOpt = (type: PokeDetailRes["types"][number]) => {
  return POKEMON_TYPES.find((t) => t.value === type) || POKEMON_TYPES[0];
};

const getStatusOpt = (status: PokeDetailRes["moves"][number]["category"]) => {
  return POKE_MOVE_CATS.find((m) => m.value === status) || POKE_MOVE_CATS[0];
};

watch(
  () => props.moves,
  (newVal) => {
    if (!newVal || newVal.length === 0) {
      isLoading.value = true;
    } else {
      setTimeout(() => {
        isLoading.value = false;
      }, 400);
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.custom-tag {
  @apply w-3/4 m-[0_auto];
}
.moveset-table-wrapper {
  :deep(.cosms-el-table) {
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
    --el-table-header-bg-color: transparent;
    --el-table-border-color: rgba(255, 255, 255, 0.05);
    --el-table-row-hover-bg-color: rgba(34, 211, 238, 0.1);

    background-color: transparent;
    border: none;

    th.el-table__cell {
      @apply text-gray-500 font-mono tracking-widest text-xs border-b border-gray-800;
      background-color: transparent !important;
    }

    td.el-table__cell {
      @apply py-2 border-none;
    }

    &::before,
    &::after {
      display: none !important;
    }

    .el-table__inner-wrapper::before {
      display: none !important;
    }

    .el-scrollbar__bar {
      @apply opacity-50;
    }
  }

  :deep(.el-table__row) {
    @apply transition-all duration-300;
    &:nth-child(even) {
      background-color: rgba(15, 23, 42, 0.2);
    }
  }
}
</style>
