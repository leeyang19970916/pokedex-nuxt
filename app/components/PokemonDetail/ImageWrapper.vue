<template>
  <div>
    <div class="reactor-core-wrapper">
      <div
        v-for="i in 5"
        :key="i"
        :class="['core-ring', `ring-${i}`, 'primary-border']"
      ></div>
    </div>

    <img :src="image" :alt="name" class="pokemon-feature-img z-10" />
  </div>
</template>
<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";

defineProps<{
  image: PokeDetailRes["image"];
  name: PokeDetailRes["name"];
}>();
</script>
