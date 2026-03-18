<template>
  <div class="flex flex-col gap-2 w-[80%]">
    <div class="flex gap-2">
      <span class="label min-w-[50px]">屬性：</span>
      <div class="w-full flex flex-wrap gap-4">
        <Tag
          v-for="(type, index) in POKEMON_TYPES"
          :key="index"
          :mode="'outline'"
          :type="'type'"
          :option="type"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { POKEMON_TYPES } from "~/constants";
import Tag from "~/components/Tags/index.vue";
</script>
<style lang="scss" scoped>
.label {
  @apply text-primary font-bold;
}
</style>
