import { fetchTranslatedName } from './items.js';
import { dropTableHead } from './parameters.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

/**
 * Translates parameters in the input text based on the @dropTableHead object.
 * Ignores translation within these arrow thingys "<" and ">".
 */
const parameterTranslator = (objectToBeTranslated) => {
    // Splits by both '<' and '>' via RegEx.
    let output = inputDrops.value.split(/[<>]+/);
    const len = output.length;

    for (let parameter in objectToBeTranslated) {
        // Insensitive case regex that matches any digits at the end of the string.
        const regex = new RegExp(`\\b${parameter}\\b\\d*`, 'ig');

        // Extract any digits at the end of the match and append them to the replacement string.
        const digits = parameter.match(/\d+$/);
        const translated =
            objectToBeTranslated[parameter] + (digits ? digits[0] : '');

        for (let i = 0; i < len; i++) {
            // Everything between any '<' and '>' are on odd indexes inside 'output'.
            if (i % 2 == 0) {
                output[i] = output[i].replace(regex, translated);
            }
        }
    }

    // Joins 'output' by alternating between '<' and '>'.
    outputDrops.value = output.reduce((acc, curr, index) => {
        if (index === 0) {
            return curr;
        }
        return acc + (index % 2 === 0 ? '>' : '<') + curr;
    }, '');
};

const translateItemNames = () => {
    let lines = outputDrops.value.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let item = lines[i];

        // Check if it has a name to be translated.
        if (item.indexOf('=') != -1) {
            item = item.split('=');
            item = item[1].split('|');
            item = item[0].trim();

            const translatedName = fetchTranslatedName(item);
            if (translatedName) {
                // Replace the item name with the translated name.
                lines[i] = lines[i].replace(item, translatedName);
            }
        }
    }

    outputDrops.value = lines.join('\n');
};

inputDrops.addEventListener('input', () => {
    outputDrops.value = inputDrops.value;

    parameterTranslator(dropTableHead);
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
