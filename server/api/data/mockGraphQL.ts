export default defineEventHandler(async () => {
  const graphqlUrl = "https://beta.pokeapi.co/graphql/v1beta";

  // 1. 移除了有問題的 pokemonsprites 區塊，保持 Query 乾淨
  const query = `
      query getAllPokemon {
        pokemon_v2_pokemon(limit: 1025) {
          id
          name
          height
          weight
          pokemon_v2_pokemonabilities {
            is_hidden
            pokemon_v2_ability {
              name
            }
          }
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }
          }
          pokemon_v2_pokemonspecy {
            pokemon_v2_generation {
              pokemon_v2_region {
                name
              }
            }
          }
        }
      }
    `;

  try {
    const res: any = await $fetch(graphqlUrl, {
      method: "POST",
      body: { query },
    });

    // 攔截 GraphQL 錯誤
    if (res.errors) {
      console.error(
        "❌ GraphQL 語法錯誤：",
        JSON.stringify(res.errors, null, 2)
      );
      throw new Error("GraphQL Syntax Error");
    }

    // 2. 開始洗資料
    const cleanData = res.data.pokemon_v2_pokemon.map((p: any) => {
      // 處理屬性
      const types = p.pokemon_v2_pokemontypes.map(
        (t: any) => t.pokemon_v2_type.name
      );

      // 處理六圍數值
      const stats = p.pokemon_v2_pokemonstats.reduce((acc: any, curr: any) => {
        acc[curr.pokemon_v2_stat.name] = curr.base_stat;
        return acc;
      }, {});

      // 處理特性
      const abilities = p.pokemon_v2_pokemonabilities.map(
        (i: any) => i.pokemon_v2_ability.name
      );

      // 處理地區 (順便處理一下阿羅拉等特殊型態的暴力攔截)
      let region =
        p.pokemon_v2_pokemonspecy?.pokemon_v2_generation?.pokemon_v2_region
          ?.name || "unknown";
      if (p.name.includes("-alola")) region = "alola";
      if (p.name.includes("-galar")) region = "galar";
      if (p.name.includes("-hisui")) region = "hisui";
      if (p.name.includes("-paldea")) region = "paldea";

      // 🔥 直接用 ID 組合出最高畫質的官方圖片！(這是最穩、最快的做法)
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;

      return {
        id: p.id,
        name: p.name,
        height: p.height,
        weight: p.weight,
        types,
        stats,
        image,
        abilities,
        region,
      };
    });

    return cleanData;
  } catch (error) {
    console.error("GraphQL 抓取失敗", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch data from PokeAPI GraphQL",
    });
  }
});
