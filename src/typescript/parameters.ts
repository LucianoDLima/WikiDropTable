import { CaseInsensitiveMap } from "./caseInsensitiveMap";

async function fetchData(): Promise<{ 
    parameters: CaseInsensitiveMap<string, any>, 
    infoboxes: CaseInsensitiveMap<string, any> }> {

    return Promise.all([
        fetch('public/data/parameters.json').then(response => response.json() as Promise<Record<string, any>>),
        fetch('public/data/infoboxes.json').then(response => response.json() as Promise<Record<string, any>>)
    ])
    .then(([jsonData1, jsonData2]) => {
        const parameters = new CaseInsensitiveMap(Object.entries(jsonData1));
        const infoboxes = new CaseInsensitiveMap(Object.entries(jsonData2).map(([key, value]) => [key.toLowerCase(), value]));
        return { parameters, infoboxes };
    })
    .catch(error => {
        console.error('Error loading JSON files:', error);
        throw error;
    });
}

export const { parameters, infoboxes } = await fetchData();