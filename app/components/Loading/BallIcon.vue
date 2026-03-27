<template>
  <img
    :src="BallIcon"
    alt="Loading..."
    width="50"
    height="50"
    class="loading-pokerball"
  />
</template>

<script setup>
import BallIcon from "~/assets/image/ball.svg";
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-pokerball {
  animation: spin 2s linear infinite; /* 我把時間加長到 2s，看起來穩重一點 */
}
</style>
