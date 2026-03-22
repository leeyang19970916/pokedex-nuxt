// server/api/pokemon/fetchAll.ts
export default defineCachedFunction(
  async () => {
    const graphqlUrl = "https://beta.pokeapi.co/graphql/v1beta";

    // 只跟 GraphQL 要最核心的資料，把傳輸壓到最小
    const query = `
    query getAllPokemon {
      pokemon_v2_pokemon(limit: 1025) {
        id
        name
        height
        weight
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
        pokemon_v2_pokemonsprites {
          other{
            official-artwork{
              front_default
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

      // 終極資料清洗：一次把 ID、屬性、數值、圖片全部搞定
      const cleanData = res.data.pokemon_v2_pokemon.map((p: any) => {
        // 1. 處理屬性
        const types = p.pokemon_v2_pokemontypes.map(
          (t: any) => t.pokemon_v2_type.name,
        );

        // 2. 處理六圍數值 (轉成物件格式)
        const stats = p.pokemon_v2_pokemonstats.reduce(
          (acc: any, curr: any) => {
            acc[curr.pokemon_v2_stat.name] = curr.base_stat;
            return acc;
          },
          {},
        );

        // 3. 直接用 ID 組合出最高畫質的官方圖片
        const image =
          res.data.pokemon_v2_pokemonsprites.other["official-artwork"]
            .front_default;
        // 如果你想要備用的低畫質圖，可以這樣寫：
        // const fallbackImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;

        return {
          id: p.id,
          name: p.name,
          height: p.height,
          weight: p.weight,
          types,
          stats,
          image,
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
  },
  { maxAge: 86400, name: "graphql-pokemon-all-v1" },
); // 快取 24 小時
