import { CaseInsensitiveMap } from "./caseInsensitiveMap.js";

async function fetchData() {
    return Promise.all([
        fetch('./data/dataItems.json').then(response_1 => response_1.json()),
        fetch('./data/dataNPCs.json').then(response_2 => response_2.json())
    ])
    .then(([json1, json2]) => {
        const itemNames = new CaseInsensitiveMap(json1.map(([_, pt, eng]) => [eng, pt]));
        const npcNames = new CaseInsensitiveMap(json2.map(([eng, pt]) => [eng, pt]));
        const geItems = new CaseInsensitiveMap(json1.map(([id, pt, _]) => [pt, id]));
        return { itemNames, npcNames, geItems };
    })
    .catch(error => {
        console.error('Error loading JSON files:', error);
    });
}
  
export const { itemNames, npcNames, geItems } = await fetchData();