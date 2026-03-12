<template>
  <div>
    <h1>屬性名稱：{{ $route.params.name }}</h1>
    <p>這裡之後要顯示寶可夢列表</p>
  </div>
</template>

<script setup>
// 先放著，等一下再來寫 fetch 邏輯
const route = useRoute();
console.log("當前屬性是：", route.params.name);
</script>
