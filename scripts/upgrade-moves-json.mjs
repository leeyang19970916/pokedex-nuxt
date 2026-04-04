import fs from "fs/promises";

const res = await fetch('https://pokeapi.co/api/v2/move?limit=1000');
const tempObj = await res.json();
const moveListNewData = tempObj.results.map(i => i.url);


const moveDetail = [];
const CHUNK_SIZE = 50;

for (let i = 0; i < moveListNewData.length; i += CHUNK_SIZE) {
    const chunk = moveListNewData.slice(i, i + CHUNK_SIZE);


    const fetchPromises = chunk.map(url => fetch(url).then(r => r.json()));
    const chunkResults = await Promise.all(fetchPromises);

    moveDetail.push(...chunkResults);

    await new Promise(resolve => setTimeout(resolve, 500));
}


const movesDictionary = {};

moveDetail.forEach(move => {
    const zhNameObj = move.names.find(n => n.language.name === "zh-hant");
    const enNameObj = move.names.find(n => n.language.name === "en");

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

await fs.writeFile(
    "./server/api/rawData/moves.json",
    JSON.stringify(movesDictionary, null, 2),
    "utf-8"
);
console.log('move done');
