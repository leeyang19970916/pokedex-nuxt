import fs from "fs/promises";


const listRes = await fetch('https://pokeapi.co/api/v2/ability?limit=400')
const LIMIT = 50

const listJSON = await listRes.json()
const urlArr = listJSON.results.map(i => i.url)
const result = []


for (let i = 0; i < urlArr.length; i += LIMIT) {
    const chunk = urlArr.slice(i, i + LIMIT)

    const promises = chunk.map(c => fetch(c).then(r => r.json()))
    const res = await Promise.all(promises)
    const r = res.map(item => {
        const id = item.id
        const enName = item.name
        const chName = item.names.find(i => i.language.name === 'zh-hant')?.name || item.names.find(i => i.language.name === 'zh-hans')?.name || item.name

        return {
            id, enName, chName
        }
    })
    result.push(...r)

}


await fs.writeFile(
    "./server/api/rawData/abilities.json",
    JSON.stringify(result, null, 2),
    "utf-8"
);

console.log('ability done');