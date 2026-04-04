import fs from "fs/promises";

const rawData = await fs.readFile("./server/api/rawData/pokedex.json", "utf-8");
const pokemonList = JSON.parse(rawData);

for (let i = 0; i < pokemonList.length; i++) {
  const p = pokemonList[i];
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${p.id}`,
    );
    const speciesData = await res.json();

    const twNameObj =
      speciesData.names.find((n) => n.language.name === "zh-hant" || n.language.name === "zh-hans")
    const enNameObj =
      speciesData.names.find((n) => n.language.name === "en") || "none";
    if (twNameObj) {
      p.name = twNameObj.name;
      p.enName = enNameObj.name;
    }

    const genus = getGenera(speciesData.genera)
    p.genus = genus
    await new Promise((resolve) => setTimeout(resolve, 50));
  } catch (err) {
    console.error(`[錯誤] 處理 #${p.id} 失敗:`, err.message);
  }
}

await fs.writeFile(
  "./server/api/rawData/pokedex.json",
  JSON.stringify(pokemonList, null, 2),
  "utf-8",
);
function getGenera(genera) {
  return (genera.find(g => g.language.name === 'zh-hant' || g.language.name === 'zh-hans' || g.language.name === 'en')?.genus ||
    '無分類')
}

console.log('pokedex done')