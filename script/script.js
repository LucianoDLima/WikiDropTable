import { indexOf2D, fetchTranslatedName } from './items.js';
import { dropTableHead } from './parameters.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

const parameterTranslator = () => {
    for (let parameter in dropTableHead) {
        // Insensitive case regex that matches any digits at the end of the string.  
        const regex = new RegExp(`\\b${parameter}\\b\\d*`, 'ig');

        // Extract any digits at the end of the match and append them to the replacement string.
        const digits = parameter.match(/\d+$/);
        const translated = dropTableHead[parameter] + (digits ? digits[0] : '');

        outputDrops.value = outputDrops.value.replace(regex, translated);
    }
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
            item = item[0]
        
            const idx = indexOf2D(item);
            if (idx) {
                lines[i] = lines[i].replace(item, fetchTranslatedName(idx));
            }
        }
    };

    outputDrops.value = lines.join("\n");
};

inputDrops.addEventListener('mouseover', () => {
    outputDrops.value = inputDrops.value;

    parameterTranslator();
    translateItemNames();
});