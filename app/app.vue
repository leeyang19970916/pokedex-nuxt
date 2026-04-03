<template>
  <NuxtLayout :name="'default'">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { POKEDEX } from "./constants";

useHead({
  titleTemplate: (pokeName) => `${pokeName ? `${pokeName} | ` : ""}${POKEDEX}`,
});
</script>
