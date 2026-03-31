import Pokedex from "~~/server/api/rawData/pokedex.json";
export const translateVariantName = (enName: string) => {
  const name = Pokedex.find((item) =>
    enName.toLocaleLowerCase().includes(item.enName.toLocaleLowerCase()),
  )?.name;
  if (!name) {
    return enName;
  }
  // 1. 處理 Mega 進化
  if (enName.includes("-mega-x")) return `超級${name} X`;
  if (enName.includes("-mega-y")) return `超級${name} Y`;
  if (enName.includes("-mega")) return `超級${name}`;

  // 2. 處理超極巨化
  if (enName.includes("-gmax")) return `超極巨化${name}`;

  // 3. 處理地區型態
  if (enName.includes("-alola")) return `${name} (阿羅拉的樣子)`;
  if (enName.includes("-galar")) return `${name} (伽勒爾的樣子)`;
  if (enName.includes("-hisui")) return `${name} (洗翠的樣子)`;
  if (enName.includes("-paldea")) return `${name} (帕底亞的樣子)`;

  // 4. 處理回歸原始 (固拉多/蓋歐卡)
  if (enName.includes("-primal")) return `原始${name}`;

  // 如果都沒有特殊後綴（代表是普通型態），直接回傳本名
  return name;
};
