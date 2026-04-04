<template>
  <div>
    <div
      class="reactor-core-wrapper scale-[0.6] md:scale-100 transition-transform duration-300"
    >
      <div v-for="i in 5" :key="i" :class="['core-ring', `ring-${i}`]"></div>
    </div>

    <NuxtImg
      fetchpriority="high"
      loading="eager"
      :src="image"
      :alt="name"
      class="pokemon-feature-img z-10"
    />
  </div>
</template>

<script setup lang="ts">
import type { PokeDetailRes } from "~/types/pokeDetail";

defineProps<{
  image: PokeDetailRes["image"];
  name: PokeDetailRes["name"];
}>();
</script>

<style scoped lang="scss">
$primary-cyan: rgba(179, 234, 254, 0.4);
$neon-cyan: rgba(0, 243, 255, 0.6);
$pulse-duration: 8s;

.reactor-core-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .core-ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid $primary-cyan;
    box-shadow: 0 0 15px rgba(179, 234, 254, 0.1) inset;
    animation: reactor-pulse $pulse-duration infinite ease-in-out;

    &::after {
      content: "";
      position: absolute;
      inset: -2px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: rgba(0, 243, 255, 0.2);
      opacity: 0.5;
    }
  }

  .ring-1 {
    width: 300px;
    height: 300px;
    border-width: 4px;
    border-color: $neon-cyan;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.2) inset;
    animation: reactor-pulse $pulse-duration infinite ease-in-out,
      rotate-clockwise 20s linear infinite;
  }

  .ring-2 {
    width: 350px;
    height: 350px;
    border-style: dashed;
    border-width: 4px;
    border-color: rgba(179, 234, 254, 0.3);
    animation: reactor-pulse $pulse-duration 1s infinite ease-in-out,
      rotate-counter-clockwise 60s linear infinite;
  }

  .ring-3 {
    width: 400px;
    height: 400px;
    border-width: 2px;
    border-color: rgba(179, 234, 254, 0.15);
    animation: reactor-pulse $pulse-duration 2s infinite ease-in-out;
  }

  .ring-4 {
    width: 450px;
    height: 450px;
    border-style: dotted;
    border-width: 8px;
    border-color: $neon-cyan;
    filter: drop-shadow(0 0 10px rgba(0, 243, 255, 0.3));
    animation: reactor-pulse $pulse-duration 3s infinite ease-in-out,
      rotate-clockwise 45s linear infinite;
  }

  .ring-5 {
    width: 500px;
    height: 500px;
    border-width: 2px;
    border-color: rgba(179, 234, 254, 0.1);
    animation: reactor-pulse $pulse-duration 4s infinite ease-in-out,
      rotate-counter-clockwise 120s linear infinite;
  }
}

@keyframes reactor-pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
    box-shadow: 0 0 10px rgba(179, 234, 254, 0.1) inset;
  }
  50% {
    opacity: 0.8;
    transform: scale(1.01);
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.2) inset;
  }
}

@keyframes rotate-clockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-counter-clockwise {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.pokemon-feature-img {
  width: 80%;
  max-width: 450px;
  filter: drop-shadow(0 0 15px rgba(179, 234, 254, 0.4));
  animation: hologram-entry 1.5s ease-out forwards,
    hologram-flicker 6s 1.5s infinite;
}

@keyframes hologram-entry {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    filter: brightness(2);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: brightness(1);
  }
}

@keyframes hologram-flicker {
  0%,
  100% {
    opacity: 1;
    filter: contrast(1);
  }
  33% {
    opacity: 0.95;
    filter: contrast(1.05);
  }
  66% {
    opacity: 0.98;
  }
}
</style>
