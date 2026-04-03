import { POKEMON_API_URL, ZH_HANT } from "~/constants";
import type { PokeDetailRes, PokemonOriginalAPIRes } from "~/types/pokeDetail";
import type { SpeciesPokeOriginalAPIRes } from "~/types/speciesPoke";
import { translateVariantName } from "~~/utils/translateVariantName";
import { formattedStat } from "~~/utils/formattedStat";
import MovesRawData from "~~/server/api/rawData/moves.json";
import type { PokeType, Id, PokeRegion } from "~/types/pokemon";
import type { PokeDemageRecord } from "~/types/pokeTypeDetail";

const getId = (url: string): Id => {
  const urlParts = url.split("/").filter(Boolean);
  const id = urlParts[urlParts.length - 1];
  return Number(id);
};

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const pokeUrl = `${POKEMON_API_URL}/pokemon/${id}`;
    const speciesUrl = `${POKEMON_API_URL}/pokemon-species/${id}`;
    const [pokeData, speciesData] = await Promise.all([
      $fetch<PokemonOriginalAPIRes>(pokeUrl),
      $fetch<SpeciesPokeOriginalAPIRes>(speciesUrl),
    ]);
    const stats = formattedStat(pokeData.stats);
    const entryText =
      speciesData.flavor_text_entries
        .find((entry) => entry.language.name === ZH_HANT)
        ?.flavor_text.replace(/[\n\f\r]/g, "") || "這隻寶可夢目前沒有描述";
    const varieties = speciesData.varieties.map((itm) => {
      const variantId = getId(itm.pokemon.url);
      return {
        name: translateVariantName(itm.pokemon.name),
        id: Number(variantId),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${variantId}.png`,
      };
    });
    const evolutionChains =
      (await $fetch("/api/pokemon/fetchEvolutionIds", {
        query: {
          url: speciesData.evolution_chain.url,
        },
      })) || [];
    const types = pokeData.types.map((t) => t.type.name);

    const moves = pokeData.moves
      .map((i) => {
        const { name } = i.move;
        return (MovesRawData as any)[name];
      })
      .sort((a, b) => {
        const isTypeA = types.includes(a.type);
        const isTypeB = types.includes(b.type);

        if (isTypeA && !isTypeB) {
          return -1; //a前面
        }
        if (!isTypeA && isTypeB) {
          return 1; //a退後
        }

        return 0;
      });
    const genus =
      speciesData.genera.find(
        (g) =>
          g.language.name === ZH_HANT ||
          g.language.name === "zh-hans" ||
          g.language.name === "en"
      )?.genus || "";

    const damageType = await getDamageType(pokeData.types);

    const region = getRegion(speciesData.generation.name);

    const result = {
      id: pokeData.id,
      name: translateVariantName(pokeData.name),
      height: pokeData.height,
      weight: pokeData.weight,
      types,
      image: pokeData.sprites.other["official-artwork"].front_default,
      abilities: pokeData.abilities.map((a) => a.ability.name),
      stats,
      moves,
      entryText,
      varieties,
      evolutionChains,
      genus,
      damageType,
      region,
    };
    return result;
  } catch (e) {
    throw createError({
      message: "get pokemonDetail is error",
      status: 500,
    });
  }
});

async function getDamageType(types: PokemonOriginalAPIRes["types"]) {
  const typeIds = types.map((t) => getId(t.type.url));
  const promises = typeIds.map((i) =>
    $fetch<PokeDemageRecord>(`/api/pokemon/type/${i}`)
  );
  const res = await Promise.all(promises);
  let double_damages: PokeType[] = [];
  let half_damages: PokeType[] = [];
  let no_damages: PokeType[] = [];
  res.forEach((i) => {
    double_damages.push(...i.double_damages);
    half_damages.push(...i.half_damages);
    no_damages.push(...i.no_damages);
  });
  return { double_damages, half_damages, no_damages };
}

function getRegion(
  generationName: SpeciesPokeOriginalAPIRes["generation"]["name"]
): PokeRegion | undefined {
  const regionMap: Record<string, PokeRegion> = {
    "generation-i": "kanto",
    "generation-ii": "johto",
    "generation-iii": "hoenn",
    "generation-iv": "sinnoh",
    "generation-v": "unova",
    "generation-vi": "kalos",
    "generation-vii": "alola",
    "generation-viii": "galar",
    "generation-ix": "paldean",
  };

  return regionMap[generationName] || undefined;
}
