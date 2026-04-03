import fs from "fs/promises";

const res = await fetch('https://pokeapi.co/api/v2/move?limit=1000');
const tempObj = await res.json();
const moveListNewData = tempObj.results.map(i => i.url);


const moveDetail = [];
const CHUNK_SIZE = 50; // 一次只並發 50 個請求

// 2. 使用 for 迴圈進行分批處理
for (let i = 0; i < moveListNewData.length; i += CHUNK_SIZE) {
    // 切出 50 個網址為一組
    const chunk = moveListNewData.slice(i, i + CHUNK_SIZE);

    console.log(`進度：正在下載第 ${i + 1} ~ ${Math.min(i + CHUNK_SIZE, moveListNewData.length)} 筆招式資料...`);

    // 這 50 個一起發送
    const fetchPromises = chunk.map(url => fetch(url).then(r => r.json()));
    const chunkResults = await Promise.all(fetchPromises);

    moveDetail.push(...chunkResults);

    await new Promise(resolve => setTimeout(resolve, 500));
}

console.log("資料下載完畢！正在啟動資料清洗與格式化...");

const movesDictionary = {};

moveDetail.forEach(move => {
    // 1. 執行 find
    const zhNameObj = move.names.find(n => n.language.name === "zh-hant"); // 注意：API 有時是大寫 H
    const enNameObj = move.names.find(n => n.language.name === "en");

    // 2. 準備退路 (Fallback)
    // 邏輯：有中文就用中文，沒中文就看有沒有英文，再沒有就用 API 原始的 key (move.name)
    const finalZhName = zhNameObj?.name || enNameObj?.name || move.name;
    const finalEnName = enNameObj?.name || move.name;

    movesDictionary[move.name] = {
        name: finalZhName,
        enName: finalEnName,
        type: move.type.name,
        category: move.damage_class ? move.damage_class.name : "status",
        power: move.power !== null ? move.power : "--",
        accuracy: move.accuracy !== null ? `${move.accuracy}%` : "--",
        pp: move.pp || "--"
    };
});

// 4. 寫入到專案資料夾中
await fs.writeFile(
    "./server/api/rawData/moves.json",
    JSON.stringify(movesDictionary, null, 2),
    "utf-8"
);

console.log("🎉 大功告成！完美的 moves.json 字典檔已成功建立！");