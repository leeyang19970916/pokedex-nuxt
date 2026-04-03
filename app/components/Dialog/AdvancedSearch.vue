<template>
  <el-dialog
    v-model="model"
    width="50vw"
    top="15vh"
    :show-close="false"
    class="tech-dialog"
    :append-to-body="true"
  >
    <template #header="{ close }">
      <div
        class="flex items-center justify-between pb-3 border-b border-primary/30"
      >
        <h3
          class="text-primary text-lg font-bold tracking-widest drop-shadow-[0_0_8px_rgba(179,234,254,0.5)]"
        >
          進階搜尋
        </h3>
        <button
          @click="close"
          class="text-gray-400 hover:text-primary transition-colors flex items-center justify-center p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </template>

    <div class="py-4 space-y-6 text-white">
      <PokeInput
        v-model="tempForm.keywords"
        placeholder="請輸入名稱或圖鑑編號搜索..."
      />

      <div class="space-y-2">
        <label class="block text-primary/80 text-sm font-medium tracking-wide"
          >屬性</label
        >
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="(type, index) in POKEMON_TYPES"
            :key="`${type.value}-${index}`"
            :type="TYPE"
            :mode="tempForm.types.includes(type.value) ? 'solid' : 'outline'"
            :option="type"
            @click="toggleSelect"
            :readOnly="false"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-primary/80 text-sm font-medium tracking-wide"
          >地區</label
        >
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="(region, index) in POKEMON_REGIONS"
            :key="`${region.value}-${index}`"
            :type="REGION"
            :mode="
              tempForm.regions.includes(region.value) ? 'solid' : 'outline'
            "
            :option="region"
            @click="toggleSelect"
            :readOnly="false"
          ></Tag>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <PokeSelect
          v-model="tempForm.ability"
          label="特性"
          :options="pokeStore.abilities"
        ></PokeSelect>

        <div class="space-y-2">
          <span class="block text-primary/80 text-sm font-medium tracking-wide"
            >圖鑑編號 (1 ~ 1025)</span
          >
          <div class="px-[4%]">
            <el-slider
              v-model="tempForm.ids"
              :marks
              range
              :size="'large'"
              :min="SLIDER_RANGE.min"
              :max="SLIDER_RANGE.max"
            />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div
        class="flex justify-end items-center gap-4 pt-4 border-t border-primary/30"
      >
        <button
          @click="clear"
          class="text-sm text-gray-400 hover:text-white transition-colors"
        >
          清除資料
        </button>
        <button
          @click="revert"
          class="px-5 py-1.5 rounded-md border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all text-sm"
        >
          取消變更
        </button>
        <button
          @click="
            () => {
              search();
              model = false;
            }
          "
          class="px-8 py-1.5 rounded-md bg-primary/20 border border-primary text-primary font-bold hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(179,234,254,0.4)] hover:shadow-[0_0_20px_rgba(179,234,254,0.8)] tracking-wide"
        >
          搜尋
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import {
  POKEMON_TYPES,
  POKEMON_REGIONS,
  REGION,
  TYPE,
  SLIDER_RANGE,
} from "~/constants";
import PokeInput from "../PokeInput/index.vue";
import PokeSelect from "../PokeSelect/index.vue";
import Tag from "~/components/Tags/index.vue";
import { usePokeStore } from "~/store/pokeStore";
import { SearchContextKey } from "~/types/pokemon";
import type { TagPayload } from "~/types/pokemon";

interface Mark {
  style: CSSProperties;
  label: string;
}

type Marks = Record<number, Mark | string>;

const model = defineModel<boolean>();
const pokeStore = usePokeStore();

const { search, tempForm, clear, revert } = inject(SearchContextKey)!;

const toggleSelect = (payload: TagPayload) => {
  const { option, type } = payload;

  const fieldKey = type === "type" ? "types" : "regions";

  const targetArray = tempForm.value[fieldKey] as string[];

  const index = targetArray.indexOf(option.value);

  if (index !== -1) {
    targetArray.splice(index, 1);
  } else {
    targetArray.push(option.value);
  }
};

const marks = shallowRef<Marks>({
  1: String(SLIDER_RANGE.min),
  1025: String(SLIDER_RANGE.max),
});
</script>

<style>
.tech-dialog {
  background: rgba(10, 15, 30, 0.85) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(179, 234, 254, 0.4) !important;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8),
    inset 0 0 20px rgba(179, 234, 254, 0.05) !important;
  border-radius: 12px !important;
  --el-color-primary: rgb(179, 234, 254);
  --el-slider-main-bg-color: var(--el-color-primary);
  --el-slider-runway-bg-color: rgba(255, 255, 255, 0.1);
  --el-slider-stop-bg-color: rgba(255, 255, 255, 0.2);
}

.tech-dialog .el-dialog__header,
.tech-dialog .el-dialog__body,
.tech-dialog .el-dialog__footer {
  background: transparent !important;
  margin-right: 0 !important;
}

.el-overlay-dialog {
  backdrop-filter: blur(4px);
}
</style>
