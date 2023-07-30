import { CaseInsensitiveMap } from "./caseInsensitiveMap";

async function fetchData(): Promise<{ itemNames: CaseInsensitiveMap<string, string>, npcNames: CaseInsensitiveMap<string, string>, geItems: CaseInsensitiveMap<string, number> }> {
    return Promise.all([
        fetch('public/data/dataItems.json').then(response => response.json() as Promise<[string, string][]>),
        fetch('public/data/dataNPCs.json').then(response => response.json() as Promise<[string, string][]>),
        fetch('public/data/dataGE.json').then(response => response.json() as Promise<[string, number][]>)
    ])
    .then(([json1, json2, json3]) => {
        const itemNames = new CaseInsensitiveMap<string, string>(json1);
        const npcNames = new CaseInsensitiveMap<string, string>(json2);
        const geItems = new CaseInsensitiveMap<string, number>(json3);
        return { itemNames, npcNames, geItems };
    })
    .catch(error => {
        console.error('Error loading JSON files:', error);
        throw error;
    });
}
  
export const { itemNames, npcNames, geItems } = await fetchData();