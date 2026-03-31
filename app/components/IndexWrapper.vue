<template>
  <div>
    <img :src="TitleBg" alt="" />
    <span class="text-[1.25rem] text-slate-900 abs-center">{{ POKEDEX }}</span>
  </div>
</template>
<script setup lang="ts">
import TitleBg from "~/assets/image/header/title_bg.png";
import { POKEDEX } from "~/constants";
</script>

<style scoped></style>
