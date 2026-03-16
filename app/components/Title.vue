<template>
  <div class="absolute top-0 z-50">
    <img :src="TitleBg" alt="" />
    <span class="text-[1.25rem] absolute top-1/2 left-1/2 transform">{{
      INDEX
    }}</span>
  </div>
</template>
<script setup lang="ts">
import TitleBg from "~/assets/image/header/title_bg.png";
import { INDEX } from "~/constants";
</script>

<style scoped>
.transform {
  transform: translate(-50%, -50%);
}
</style>
