import { fetchTranslatedName } from "./items.js";

export const translateItemNames = (outputDrops) => {
  let lines = outputDrops.value.split('\n');
  const symbolsToCheck = [
      ['=', '|'],
      ['[[', ']'],
      ['Descobrir:', '|'],
      ['[[Arquivo:', '.png]]']
  ];

  for (let i = 0; i < lines.length; i++) {
      let item = lines[i];

      // Check if it has a name to be translated.
      symbolsToCheck.forEach(([start, end]) => {
          handleFetchItems(item, lines, i, start, end);
      });
  }

  outputDrops.value = lines.join('\n');
};

function handleFetchItems(item, lines, i, start, end, fetcher) {
  if (item.indexOf(start) != -1) {
    item = item.split(start);
    item = item[1].split(end);
    item = item[0].trim();

    const translatedName = fetchTranslatedName(item.toLowerCase());
    if (translatedName) {
      // Replace the item name with the translated name.
      lines[i] = lines[i].replace(item, translatedName);
    }
  }
}
