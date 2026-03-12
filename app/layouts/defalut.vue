<template>
  <div class="flex flex-col justify-between h-dvh">
    <Header></Header>
    <section class="h-full px-2 bg-pikmin">
      <slot></slot>
    </section>
    <Footer></Footer>
  </div>
</template>
<script lang="ts" setup></script>

<style scoped>
.bg-pikmin {
  background-image: url("/app/assets/image/image.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
