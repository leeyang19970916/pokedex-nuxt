import type { PokemonOriginalAPIRes } from "~/types/pokeDetail";

export const formattedMoves = (moves: PokemonOriginalAPIRes["moves"]) => {
  const result = moves.map((m) => {
    // 1. 只取朱/紫版 (scarlet-violet) 的學會紀錄，避免資料重複爆量
    const svDetail = m.version_group_details.find(
      (d) => d.version_group.name === "scarlet-violet",
    );
    if (!svDetail) return null; // 如果這隻寶可夢在朱紫版沒這招，就丟掉

    // 2. 去我們的字典查這招的詳細數值 (用 as any 暫時繞過 TS 檢查)
    const moveInfo = (movesDict as any)[m.move.name];

    // 3. 把資料轉換成你的 UI 表格需要的樣子
    return {
      type: moveInfo?.type || "normal",
      name: moveInfo?.name || m.move.name, // 字典沒寫就顯示英文退路
      cat:
        moveInfo?.category === "physical"
          ? "PHYS."
          : moveInfo?.category === "special"
            ? "SPEC."
            : "STAT.",
      power: moveInfo?.power || "--",
      acc: moveInfo?.accuracy || "--",
      // 判斷是升級學的還是學習機
      method:
        svDetail.move_learn_method.name === "level-up"
          ? `Lv.${svDetail.level_learned_at}`
          : "TM",
    };
  });

  return result;
};
