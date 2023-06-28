export let parameters;
export let infoboxes;

Promise.all([
    fetch('./data/parameters.json').then(response => response.json()),
    fetch('./data/infoboxes.json').then(response => response.json())
    ])
    .then(([jsonData1, jsonData2]) => {
        parameters = new Map(Object.entries(jsonData1));
        infoboxes = new Map(Object.entries(jsonData2));
    })
    .catch(error => {
        console.error('Error loading JSON files:', error);
    });