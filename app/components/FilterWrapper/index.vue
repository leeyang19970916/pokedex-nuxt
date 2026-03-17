<template>
  <div>
    <div class="text-primary title">使用名稱或圖鑑編號搜索 {{ visible }}</div>
    <div class="flex items-center gap-6">
      <div><el-input v-model="input" placeholder="请输入内容"></el-input></div>
      <div>
        <el-button type="warning" @click="visible = true">進階搜索</el-button>
      </div>
      <div><el-button type="warning">隨機顯示</el-button></div>
    </div>

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
    <Types
      v-for="(type, index) in POKEMON_TYPES"
      :key="index"
      :mode="'outline'"
      :type="type"
    />
  </div>
</template>
<script setup lang="ts">
import { POKEMON_TYPES } from "~/constants";
import Types from "../Tags/PokeType.vue";
const input = ref("");
const visible = ref(false);
</script>
<style lang="scss" scoped>
.title {
  text-shadow: 0 0 5px #b3eafe, 0 0 5px #b3eafe;
}
</style>
