import { parameters, infoboxes } from './parameters.js';
import { itemNames, npcNames } from './items.js';
import { paramValuesTrie } from './trie.js';
import { infoboxesTrie } from './trie.js';

const exceptions = new Map([
    ['date', dateException],
    ['release', releaseException],
    ['exchange', mercadoException],
    ['gemw', mercadoException]
]);

function dateException(text) {
    // Finds all matching patterns of 'date = 12 June 2023'.
    return text.replace(/date\s*=\s*(\d+)\s+([\w\s]+)\s+(\d+)/ig, (_, day, month, year) => {
        return `data={{Data|${day}|${month.toLowerCase()}|${year}}}`;
    });
}

function releaseException(text) {
    const months = new Map([
        ["january", "Janeiro"],
        ["february", "Fevereiro"],
        ["march", "Março"],
        ["april", "Abril"],
        ["may", "Maio"],
        ["june", "Junho"],
        ["july", "Julho"],
        ["august", "Agosto"],
        ["september", "Setembro"],
        ["october", "Outubro"],
        ["november", "Novembro"],
        ["december", "Dezembro"]
    ]);

    // Finds all matching patterns of the 'release' parameter '([Day Month] [Year])'.
    return text.replace(/release\s*=\s*\[\[([\w\s]+)\]\]\s*\[\[([\w\s]+)\]\]/ig, (_, dayMonth, year) => {
        const [day, month] = dayMonth.trim().split(' ');
        return `lançamento={{Data|${day}|${months.get(month.toLowerCase())}|${year.trim()}}}`;
    });
}

function mercadoException(inputText) {
    // inputText isn't used, but needs to be here
    // because of how the exceptions are called.
    return "|mercado=gemw";
}

function groupParams(params) {
    return Array.from(
        // Groups paramName and paramValue together.
        { length: (params.length - 1) / 2 },
        (_, i) => [
            params[i * 2 + 1].trim(),
            params[i * 2 + 2].trim()
        ]
    );
}

function splitParamsFromLine(paramLine) {
    // Splits by both '|' and '=' to separate all params in a line.
    const params = paramLine.split(/[|=]+/);
    
    if (params.length === 1) {
        // Returns a dummy array in case the line is a single infobox, like '{{DropsTableHead}}'.
        return params[0].length === 0 ? false : [params[0], '']
    }

    // If the line starts with a infobox/param name (most likely).
    if (params[0].length !== 0) {
        return [
            params[0], 
            groupParams(params)
        ]
    }

    return groupParams(params);
}

function handleParamName(paramName, outputLine) {
    const lowercase = paramName.toLowerCase();
            
    if (exceptions.has(lowercase)) {
        return exceptions.get(lowercase)(outputLine);
    }

    if (parameters.has(lowercase)) {
        return outputLine.replace(`${paramName}=`, `${parameters.get(lowercase)}=`);
    }
    
    // Handles parameters with numbers, like 'image1='.
    const versionNumber = lowercase.slice(-1);
    if (!isNaN(versionNumber)) {
        const withoutNumber = lowercase.slice(0, -1);
        if (parameters.has(withoutNumber)) {
            return outputLine.replace(`${paramName}=`, `${parameters.get(withoutNumber)}${versionNumber}=`);
        }
    }

    return outputLine;
}

function handleParamValue(paramValue, outputLine) {
    // Splits by ':', '(' and ', ' to catch [[File]], (Notes) and multiple values.
    const paramValues = paramValue.split(/, |:|\(/);

    for (const [index, elem] of paramValues.entries()) {
        let lowercase = elem.toLowerCase();

        const lastChar = lowercase.slice(-1);
        
        // Handles (Noted) and other variants.
        if (lastChar === ')') {
            lowercase = lowercase.slice(0, -1);

            // In case the paramValue is a potion with a dosage (x).
            if (!lowercase.isNaN) {
                if (index > 0) {
                    const itemName = `${paramValues[index - 1]}(${lowercase})`;
                    lowercase = itemName.toLowerCase();
                    if (itemNames.has(lowercase)) {
                        outputLine = outputLine.replace(itemName, itemNames.get(lowercase));
                        continue;
                    }
                } 
            }

            if (parameters.has(lowercase)) {
                outputLine = outputLine.replace(elem, `${parameters.get(lowercase)})`);
                continue;
            }
        }

        // Handles {{DropsLine}} and such, that end with }}.
        if (lastChar === '}') {
            lowercase = lowercase.slice(0, -2);
            if (parameters.has(lowercase)) {
                outputLine = outputLine.replace(`=${elem}`, `=${parameters.get(lowercase)}}}`);
                continue;
            }
        }

        if (parameters.has(lowercase)) {
            // Properly translate entire words on lines that have multiple params.
            outputLine = index === 0
                ? outputLine.replace(`=${elem}`, `=${parameters.get(lowercase)}`)
                : outputLine.replace(`, ${elem}`, `, ${parameters.get(lowercase)}`);
            continue;
        }

        // Most likely, it's an item name if it made it here.
        if (itemNames.has(lowercase)) {
            outputLine = outputLine.replace(elem, itemNames.get(lowercase));
            continue;
        }

        // Past here, it'll try to scavenge the string to remove any gunk.
        const scavengedString = paramValuesTrie.removeSymbols(elem);
        lowercase = scavengedString.toLowerCase();

        // Sometimes, stuff like (melee) on image names will make it down here.
        if (parameters.has(lowercase)) {
            outputLine = outputLine.replace(scavengedString, parameters.get(lowercase));
            continue;
        }

        if (itemNames.has(lowercase)) {
            outputLine = outputLine.replace(scavengedString, itemNames.get(lowercase));
            continue;
        }

        if (npcNames.has(lowercase)) {
            outputLine = outputLine.replace(scavengedString, npcNames.get(lowercase));
        }
    }

    return outputLine;
}

function handleInputLine(inputTextLine) {
    // Standardizes to properly replace whole words during paramValue replacing.
    // Also tries to split by both '<' and '>' to skip refNotes.
    const output = inputTextLine.replace(/ = /g, "=").split(/[<>]+/);
    const outputLength = output.length;
    
    for (let i = 0; i < outputLength; i++) {
        // Any refNotes will be left on odd indexes.
        if (i % 2 === 1) {
            continue;
        }

        // Handles lines with multiple param-value combinations.
        let allParams = splitParamsFromLine(output[i]);

        // It's an empty line.
        if (!allParams) {
            continue;
        }

        // If there's an infobox/predef name to be translated.
        if (allParams.length === 2) {
            const infobox = infoboxesTrie.removeSymbols(allParams[0]);

            if (infoboxes.has(infobox)) {
                output[i] = output[i].replace(infobox, infoboxes.get(infobox));
            }
            
            allParams = allParams[1]; 
        }

        for (const [paramName, paramValue] of allParams) {
            output[i] = handleParamName(paramName, output[i]);
            output[i] = handleParamValue(paramValue, output[i]);
        }
    }

    // Joins 'output' by alternating between angle brackets.
    return output.reduce((acc, curr, index) => { return index === 0 ? curr : `${acc}${index % 2 === 0 ? '>' : '<'}${curr}` }, '');
}

export function translate(inputText) {
    // Needs to split by newlines to catch the end of a predef/infobox.
    return inputText.split('\n').map(handleInputLine).join('\n');
}