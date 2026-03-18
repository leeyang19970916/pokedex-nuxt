<template>
  <div
    class="min-h-150px w-full p-[1rem_3%] rounded-lg border-[3px] border-primary shadow-[0_0_10px_10px] shadow-primary flex flex-col gap-4"
  >
    <div class="flex items-center gap-6">
      <el-input
        v-model="input"
        placeholder="请输入使用名稱或圖鑑編號搜索"
      ></el-input>
      <el-button type="warning" @click="visible = true">進階搜索</el-button>
    </div>

    <SearchResultWrapper />

    <el-dialog v-model="visible" :show-close="false" width="500">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            Close
          </el-button>
        </div>
      </template>
      This is dialog content.
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { POKEMON_TYPES } from "~/constants";
import Tag from "../Tags/index.vue";
import SearchResultWrapper from "./SearchResultWrapper.vue";
const input = ref("");
const visible = ref(false);
</script>
<style lang="scss" scoped>
.title {
  text-shadow: 0 0 5px #b3eafe, 0 0 5px #b3eafe;
}
</style>
