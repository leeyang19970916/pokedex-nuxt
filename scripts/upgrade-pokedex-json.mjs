import fs from "fs/promises";

const rawData = await fs.readFile("./server/api/rawData/pokedex.json", "utf-8");
const pokemonList = JSON.parse(rawData);

// 2. 跑迴圈幫每隻寶可夢拿中文名
for (let i = 0; i < pokemonList.length; i++) {
  const p = pokemonList[i];
  try {
    // 打 species API 拿多國語言資料
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${p.id}`,
    );
    const speciesData = await res.json();

    // 找出繁體中文 (zh-Hant) 或 簡體中文 (zh-Hans)
    const twNameObj =
      speciesData.names.find((n) => n.language.name === "zh-hant") ||
      speciesData.names.find((n) => n.language.name === "zh-hans");
    const enNameObj =
      speciesData.names.find((n) => n.language.name === "en") || "none";
    if (twNameObj) {
      // 找到中文了！直接覆寫原本的英文 name
      p.name = twNameObj.name;
      p.enName = enNameObj.name;
      console.log(`[成功] #${p.id} 更新為: ${p.name}`);
    } else {
      console.log(`[警告] #${p.id} 找不到中文，保留英文: ${p.name}`);
    }
    delete p.enNmae;
    // ⚠️ 禮貌性延遲：每次打完 API 休息 50 毫秒，避免太頻繁被 PokéAPI 擋 IP
    await new Promise((resolve) => setTimeout(resolve, 50));
  } catch (err) {
    console.error(`[錯誤] 處理 #${p.id} 失敗:`, err.message);
  }
}

// 3. 把升級後的陣列，重新存回 JSON 檔案
await fs.writeFile(
  "./server/api/rawData/pokedex.json",
  JSON.stringify(pokemonList, null, 2),
  "utf-8",
);
console.log("🎉 升級完成！請查看 pokedex-zh.json");
