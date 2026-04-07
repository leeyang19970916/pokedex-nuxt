<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-[#050509] text-white px-6 overflow-hidden relative"
  >
    <div
      class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"
    ></div>
    <div
      class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"
    ></div>

    <div
      class="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center max-w-2xl w-full flex flex-col items-center gap-8"
    >
      <div
        class="text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary to-white neon-shadow-primary select-none"
      >
        404
      </div>

      <div class="w-full flex items-center gap-4">
        <div
          class="h-px flex-grow bg-gradient-to-r from-transparent to-white/20"
        ></div>
        <div class="text-secondary animate-spin-slow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
            />
          </svg>
        </div>
        <div
          class="h-px flex-grow bg-gradient-to-l from-transparent to-white/20"
        ></div>
      </div>

      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-bold tracking-tight text-white/90">
          警報！座標超出已知星域
        </h1>
        <p
          class="text-slate-400 max-w-md mx-auto leading-relaxed flex items-center justify-center"
        >
          導航系統無法解析路徑：
          <code
            class="text-primary bg-primary/10 px-3 py-1.5 rounded-md font-mono text-sm border border-primary/20 shadow-[0_0_10px_rgba(179,234,254,0.1)]"
          >
            {{ $route.path }}
          </code>
        </p>
        <span class=""> 您似乎誤入了無人探索的虛空區域...</span>
      </div>

      <div class="flex flex-col sm:flex-row gap-5 w-full justify-center mt-4">
        <NuxtLink
          to="/"
          class="group px-10 py-4 bg-primary text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(179,234,254,0.5)] hover:shadow-[0_0_35px_rgba(179,234,254,0.8)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          重新啟動導航
        </NuxtLink>

        <button
          @click="$router.back()"
          class="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 text-white/80 hover:text-white flex items-center justify-center gap-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          嘗試返回原座標
        </button>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-60"
    ></div>
  </div>
</template>

<script setup lang="ts">
setResponseStatus(404, "Page Not Found");

// SEO Meta
useSeoMeta({
  title: "404 導航失效 | Cosmic Pokédex",
  description: "警報！您訪問的路徑不存在，請重新啟動導航回到已知星域。",
});
</script>

<style scoped>
/* 霓虹發光效果 (Neon Shadow) */
.neon-shadow-primary {
  filter: drop-shadow(0 0 15px rgba(179, 234, 254, 0.7));
}

/* 慢速旋轉動畫 */
.animate-spin-slow {
  animation: spin 6s linear infinite;
}

/* 慢速呼吸燈動畫 */
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}
</style>
