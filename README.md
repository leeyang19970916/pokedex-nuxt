# 🌌 Cosmic Pokédex (寶可夢圖鑑)

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Nuxt.js](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxt.js&logoColor=00DC82)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> 一個基於 Nuxt 3 打造的現代化寶可夢圖鑑。結合 Glassmorphism (玻璃擬物化) 與科幻霓虹視覺風格，並透過 SSR 與精密的狀態快取機制，提供極致流暢的用戶體驗。

### [🌍 View Live Demo: Pokédex 寶可夢圖鑑](https://pokedex-nuxt-pi.vercel.app/)

## ✨ 專案亮點 (Key Features)

- **🚀 智慧狀態快取 (Intelligent State Caching)：** 使用 Pinia 實作自定義快取機制。當使用者從詳細頁面返回列表時，無縫還原先前的搜尋條件、排序狀態與滾動位置，真正做到「零閃爍、免重新 Fetch」的流暢體驗。
- **📱 完美響應式設計 (Mobile-First RWD)：** 透過 Tailwind CSS 精準控制斷點，確保從手機端的多型態橫向滑動 (Horizontal Scroll)，到桌機端的多欄位佈局，皆能完美呈現佈局與動畫。
- **🔍 進階多維度搜尋：** 支援關鍵字、世代地區、屬性、特性等多條件交叉篩選，並實作 Debounce 防抖機制以減少不必要的 API 請求。
- **🛠️ 伺服器端渲染與 SEO (SSR & Dynamic Meta)：** 善用 Nuxt 3 `useSeoMeta`，為每一隻寶可夢動態生成專屬的 Open Graph 標籤與 Title，提升社群分享體驗與搜尋引擎排名。
- **🎨 科幻感 UI/UX：** 大量運用 CSS 漸層、`backdrop-blur`、呼吸燈動畫與 SVG 幾何圖形，跳脫傳統圖鑑框架，打造沉浸式操作介面。

## 🛠️ 技術棧 (Tech Stack)

- **核心框架：** Vue 3 (Composition API) / Nuxt 3
- **型別檢查：** TypeScript
- **UI 樣式：** Tailwind CSS / Element Plus / SCSS
- **狀態管理：** Pinia
- **工具函式：** VueUse
- **資料來源：** [PokéAPI](https://pokeapi.co/) 搭配 Nuxt Nitro 伺服器引擎進行二次封裝

## 📂 核心架構與實踐 (Architecture & Practices)

### 1. API 封裝與錯誤處理

透過 Nuxt 3 的 `server/api` 建立 BFF (Backend For Frontend) 層，隱藏第三方 API 邏輯，並實作統一的錯誤拋出機制 (`createError`)，確保前端能優雅地處理 404 或 500 等例外狀況。

### 2. 避免 Layout Shift (佈局偏移)

在載入與搜尋切換時，實作與真實元件高度、外觀 100% 一致的高質感「骨架屏 (Skeleton Screen)」，結合 Vue `<transition>` 淡入淡出，消除資料載入時的畫面抖動。

### 3. Flexbox 置中與滑動的完美平衡

針對「皮卡丘、伊布」等擁有多型態的寶可夢，運用 `w-max min-w-full justify-center` 的 CSS 技巧，解決了 Flexbox 導致的資料溢出裁切問題，實現「數量少時置中，數量多時可橫向滑動」的最佳實踐。

## 💻 本地端運行 (Getting Started)

本專案採用 [pnpm](https://pnpm.io/) 進行套件管理，以確保嚴格的依賴管控與極致的安裝速度。請確認您的開發環境已安裝 Node.js (建議 v18+) 與 pnpm。

```bash
# 1. 複製專案
git clone [https://github.com/leeyang19970916/pokedex-nuxt.git](https://github.com/leeyang19970916/pokedex-nuxt.git)

# 2. 進入資料夾
cd pokedex-nuxt

# 3. 安裝依賴套件 (⚠️ 請務必使用 pnpm，避免生成多餘的 lock 檔)
pnpm install

# 4. 啟動本地開發伺服器
pnpm dev
```
