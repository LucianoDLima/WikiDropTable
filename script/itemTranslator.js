import { handleFetchData } from "./items.js";

export const translateItemNames = (outputDrops, data) => {
  let lines = outputDrops.value.split('\n');
  const symbolsToCheck = [
      ['=', '|'],
      ['=', '.png'],
      ['[[', ']'],
      ['Descobrir:', '|'],
      ['[[Arquivo:', '.png'],
      ['==', '==']
  ];

  for (let i = 0; i < lines.length; i++) {
      let item = lines[i];

      // Check if it has a name to be translated.
      symbolsToCheck.forEach(([start, end]) => {
          handleFetchData(item, lines, i, start, end, data);
      });
  }

  outputDrops.value = lines.join('\n');
};