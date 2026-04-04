import Pokedex from "~~/server/api/rawData/pokedex.json";
export const translateVariantName = (enName: string) => {
  const name = Pokedex.find((item) =>
    enName.toLocaleLowerCase().includes(item.enName.toLocaleLowerCase())
  )?.name;
  if (!name) {
    return enName;
  }
  if (enName.includes("-mega-x")) return `超級${name} X`;
  if (enName.includes("-mega-y")) return `超級${name} Y`;
  if (enName.includes("-mega")) return `超級${name}`;

  if (enName.includes("-gmax")) return `超極巨化${name}`;

  if (enName.includes("-alola")) return `${name} (阿羅拉的樣子)`;
  if (enName.includes("-galar")) return `${name} (伽勒爾的樣子)`;
  if (enName.includes("-hisui")) return `${name} (洗翠的樣子)`;
  if (enName.includes("-paldea")) return `${name} (帕底亞的樣子)`;

  if (enName.includes("-primal")) return `原始${name}`;

  return name;
};
