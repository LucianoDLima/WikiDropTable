export let itemNames;
export let npcNames;

Promise.all([
    fetch('./data/dataItems.json').then(response => response.json()),
    fetch('./data/dataNPCs.json').then(response => response.json())
    ])
    .then(([jsonData1, jsonData2]) => {
        itemNames = new Map(jsonData1.map(([key, value]) => [key.toLowerCase(), value]));
        npcNames = new Map(jsonData2.map(([key, value]) => [key.toLowerCase(), value]));
    })
    .catch(error => {
        console.error('Error loading JSON files:', error);
    });