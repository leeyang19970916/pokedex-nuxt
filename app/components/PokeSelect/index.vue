<template>
  <div class="space-y-2 w-full">
    <label
      v-if="label"
      class="block text-primary/80 text-sm font-medium tracking-wide"
    >
      {{ label }}
    </label>

    <div class="relative w-full">
      <el-select-v2
        v-model="model"
        :options="options"
        placeholder="Please select"
        class="cosmic-select w-full"
        popper-class="cosmic-popper"
        :teleported="false"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokeAbility } from "~/types/pokemon";
// ⚠️ 已經拔掉 useVirtualList！

const props = withDefaults(
  defineProps<{
    label?: string;
    options: PokeAbility[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const model = defineModel<PokeAbility["value"]>({
  default: undefined,
});
</script>

<style scoped>
/* 1. 核心變數收斂：將變數與樣式統整在同一個作用域 */
.cosmic-select {
  --el-fill-color-blank: rgba(0, 0, 0, 0.4) !important;
  --el-bg-color: rgba(0, 0, 0, 0.4) !important;
  --el-text-color-regular: #ffffff !important;
  --el-input-text-color: #ffffff !important;
  --el-border-color: rgba(179, 234, 254, 0.4) !important;
  --el-border-color-hover: rgba(179, 234, 254, 0.8) !important;
  --el-border-radius-base: 0.375rem !important;
}

/* 2. 輸入框外殼 (Wrapper) 整合 */
.cosmic-select :deep(.el-select-v2__wrapper) {
  background-color: var(--el-fill-color-blank) !important;
  border: 1px solid var(--el-border-color) !important;
  box-shadow: 0 0 0 1px var(--el-border-color) inset !important;
  border-radius: var(--el-border-radius-base);
  min-height: 2.5rem;
  transition: all 0.3s;
}

/* 狀態切換整合：Hover, Focused, Disabled */
.cosmic-select :deep(.el-select-v2__wrapper:hover) {
  border-color: var(--el-border-color-hover) !important;
}

.cosmic-select :deep(.el-select-v2__wrapper.is-focused) {
  border-color: rgba(179, 234, 254, 1) !important;
  box-shadow: 0 0 0 1px rgba(179, 234, 254, 1) inset,
    0 0 10px rgba(179, 234, 254, 0.3) !important;
}

.cosmic-select :deep(.el-select-v2__wrapper.is-disabled) {
  background-color: rgba(0, 0, 0, 0.2) !important;
  opacity: 0.5;
  cursor: not-allowed;
}

/* 3. 內部元素整理：文字、Placeholder、圖標 */
.cosmic-select :deep(.el-select-v2__selection-text) {
  color: #ffffff !important;
  font-weight: 500;
}

.cosmic-select :deep(.el-select-v2__placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

.cosmic-select :deep(.el-select-v2__suffix .el-icon) {
  color: rgba(179, 234, 254, 0.8) !important;
}

/* 4. 下拉選單 (Popper) 樣式整理 */
:deep(.cosmic-popper) {
  background-color: #111827 !important;
  border: 1px solid rgba(179, 234, 254, 0.3) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
}

:deep(.cosmic-popper .el-select-dropdown__item) {
  color: white !important;
  background-color: transparent !important;
  transition: all 0.2s;
}

/* 選項狀態：Hover & Selected */
:deep(.cosmic-popper .el-select-dropdown__item.hover),
:deep(.cosmic-popper .el-select-dropdown__item:hover) {
  background-color: rgba(179, 234, 254, 0.15) !important;
}

:deep(.cosmic-popper .el-select-dropdown__item.is-selected) {
  color: #b3eafe !important;
  font-weight: bold;
  background-color: rgba(179, 234, 254, 0.1) !important;
}
</style>
