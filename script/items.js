export let namesDataSet;

try {
    const [itemNames, npcNames] = await Promise.all([
        fetch('./data/dataItems.json').then(response => response.json()),
        fetch('./data/dataNPCs.json').then(response => response.json())
    ]);

    namesDataSet = [
        new Map(itemNames.map(([key, value]) => [key.toLowerCase(), value])),
        new Map(npcNames.map(([key, value]) => [key.toLowerCase(), value]))
    ];
} catch (error) {
    console.error('Error loading JSON file:', error);
}