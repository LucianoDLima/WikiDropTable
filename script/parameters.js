import { CaseInsensitiveMap } from "./caseInsensitiveMap.js";

async function fetchData() {
    return Promise.all([
        fetch('./data/parameters.json').then(response => response.json()),
        fetch('./data/infoboxes.json').then(response => response.json())
    ])
    .then(([jsonData1, jsonData2]) => {
        const parameters = new CaseInsensitiveMap(Object.entries(jsonData1));
        const infoboxes = new CaseInsensitiveMap(Object.entries(jsonData2).map(([key, value]) => [key.toLowerCase(), value]));
        return { parameters, infoboxes };
    })
    .catch(error => {
        console.error('Error loading JSON files:', error);
    });
}

export const { parameters, infoboxes } = await fetchData();