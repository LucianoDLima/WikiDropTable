import { CaseInsensitiveMap } from "./caseInsensitiveMap.js";

async function fetchData() {
    return Promise.all([
        fetch('./data/dataItems.json').then(response => response.json()),
        fetch('./data/dataNPCs.json').then(response => response.json()),
        fetch('./data/dataGE.json').then(response => response.json())
    ])
    .then(([json1, json2, json3]) => {
        const itemNames = new CaseInsensitiveMap(json1);
        const npcNames = new CaseInsensitiveMap(json2);
        const geItems = new CaseInsensitiveMap(json3);
        return { itemNames, npcNames, geItems };
    })
    .catch(error => {
        console.error('Error loading JSON files:', error);
    });
}
  
export const { itemNames, npcNames, geItems } = await fetchData();