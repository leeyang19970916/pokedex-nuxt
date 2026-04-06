# Cosmic Pokédex

以 Nuxt 打造的寶可夢圖鑑網站，結合科幻風格介面、多條件搜尋、SSR，以及針對列表頁操作體驗設計的快取機制，讓使用者在瀏覽、篩選與返回列表時都能保持流暢。

## Demo

[Live Demo](https://pokedex-nuxt-pi.vercel.app/)

## Features

- 多條件搜尋與篩選：支援名稱、圖鑑編號、地區、屬性與特性等條件組合查詢
- 列表狀態快取：返回列表頁時保留搜尋條件、排序結果與已載入資料，減少重複請求與畫面跳動
- 寶可夢詳細頁：整合基礎資料、能力值、特性、招式、進化鏈與型態切換
- SSR 與 SEO：透過 Nuxt 的頁面資料取得與 meta 設定，提升首屏體驗與分享品質
- 響應式介面：針對手機與桌機設計不同的版面節奏，兼顧資訊密度與可讀性

## Tech Stack

- Nuxt 4
- Vue 3 Composition API
- TypeScript
- Pinia
- Tailwind CSS
- Element Plus
- VueUse
- Nitro Server API

## Project Structure

```text
app/
  components/    UI 元件
  pages/         頁面路由
  layouts/       版型
  store/         Pinia 狀態管理
  types/         型別定義
server/api/
  pokemon/       封裝後的圖鑑 API
  rawData/       預先整理的靜態資料
scripts/         資料整理腳本
```

## Architecture Notes

### 1. BFF API Layer

專案透過 `server/api` 封裝第三方資料來源，將資料整理、錯誤處理與欄位轉換集中在伺服器端，避免前端直接耦合外部 API 結構。

### 2. Cached List Experience

列表頁使用 Pinia 保存查詢條件與結果，讓使用者從詳細頁返回時可以延續原本的瀏覽脈絡，而不是重新從第一屏開始。

### 3. Detail Page Composition

詳細頁將基礎資料、型態切換、進化鏈、招式與能力值拆成獨立元件，讓畫面結構與資料責任更清楚，也比較容易維護與擴充。

## Getting Started

建議使用 Node.js 18 以上版本與 `pnpm`。

```bash
pnpm install
pnpm dev
```

開發伺服器啟動後，預設可於 `http://localhost:3000` 查看網站。

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm generate
pnpm fetch-data
```

## Data Source

本專案的主要資料來源為 [PokéAPI](https://pokeapi.co/)，部分資料會透過本地腳本預先整理為 JSON，以降低前端重複處理成本。
