<template>
  <div>
    <img :src="FakeBg" alt="" />
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import FakeBg from "~/assets/image/fake_bg.png";
</script>
