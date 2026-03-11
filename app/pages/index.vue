<template>
  {{ status }}
  <div v-if="status === 'pending'">{{ status }}</div>
  <button
    @click="
      () => {
        refresh();
        console.log('refresh');
      }
    "
  >
    refresh
  </button>
  <div v-for="(item) in data." :key="index">
    <img src="" alt="" />
  </div>
</template>
<script setup lang="ts">
const { data, status, error, refresh } = useFetch("/api/ditto");
console.log(data, "data");
</script>
