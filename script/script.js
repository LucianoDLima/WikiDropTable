import { indexOf2D, fetchTranslatedName } from './items.js';
import { dropTableHead } from './parameters.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

/**
 * Translates parameters in the input text based on the @dropTableHead object.
 * Ignores translation within these arrow thingys "<" and ">".
 */
const parameterTranslator = () => {
  const input = inputDrops.value;
  let output = '';
  let currentIndex = 0;
  // Tracks if there's an item currently inside the arrow thingys
  let inAngleBrackets = false;

  while (currentIndex < input.length) {
    if (input[currentIndex] === '<') {
      inAngleBrackets = true;
      output += input[currentIndex];
      currentIndex++;
    } else if (input[currentIndex] === '>') {
      inAngleBrackets = false;
      output += input[currentIndex];
      currentIndex++;
    } else if (!inAngleBrackets) {
      let matchFound = false;

      for (let parameter in dropTableHead) {
        const regex = new RegExp(`\\b${parameter}\\b\\d*`, 'ig');
        regex.lastIndex = currentIndex; // Set the regex start index

        const match = regex.exec(input);

        if (match && match.index === currentIndex) {
          const translated =
            dropTableHead[parameter] + (match[0].match(/\d+$/) || '');
          output += translated;
          currentIndex += match[0].length;
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        // If no parameter match is found, add the current character to the output
        output += input[currentIndex];
        currentIndex++;
      }
    } else {
      /**
       * If currently inside arrow thingys, add the current character to the output
       * It will still be in english tho, so we can either append it as is
       * or we just leave it in an empty string like this "<>", whichever is best
       */
      output += input[currentIndex];
      currentIndex++;
    }
  }

  outputDrops.value = output;
};

const translateItemNames = async () => {
  let lines = outputDrops.value.split('\n');

  for (let i = 0; i < lines.length; i++) {
    let item = lines[i];

    // It has a name to be translated.
    if (item.indexOf('=') != -1) {
      // Strips 'Grimy irit' from {{DropsLine|Name=Grimy irit|Quantity=3|Rarity=Common}}.
      item = item.split('=');
      item = item[1].split('|');
      item = item[0];

      const idx = indexOf2D(item);
      if (idx) {
        lines[i] = lines[i].replace(item, fetchTranslatedName(idx));
      }
    }
  }

  outputDrops.value = lines.join('\n');
};

inputDrops.addEventListener('input', () => {
  outputDrops.value = inputDrops.value;

  parameterTranslator();
  translateItemNames();
});

outputDrops.addEventListener('click', () => {
  outputDrops.select();
  document.execCommand('copy');

  // Unselect it all after copying
  const selection = window.getSelection();
  selection.removeAllRanges();

  setTimeout(() => {
    outputDrops.textContent = outputDrops.value;
  }, 1500);
});
