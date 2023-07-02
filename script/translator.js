import { parameters, infoboxes } from './parameters.js';
import { itemNames, npcNames } from './items.js';
import { paramValuesTrie } from './trie.js';

const exceptions = new Map([
    ['date', dateException],
    ['release', releaseException]
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

function translatePredefNames(inputText) {
    // Searches as many predef/infobox names from the known ones at infoboxes. 
    const predefNames = Array.from(infoboxes.keys()).filter(key => new RegExp(key, 'i').test(inputText));

    if (predefNames != null) {
        predefNames.forEach(
            // Translates as many occurrences of all predef/infobox names found as possible.
            element => inputText = inputText.replace(new RegExp(element, 'gi'), infoboxes.get(element))
        );
    }

    return inputText;
}

function splitParamsFromLine(paramLine) {
    let params = paramLine.split(/[|=]+/);

    return params.length === 1 ? false : Array.from(
        // Groups paramName and paramValue together.
        { length: (params.length - 1) / 2 }, 
        (_, i) => [
            params[i * 2 + 1].trim(), 
            params[i * 2 + 2].trim()
        ]);
}

function handleParameters(inputTextLine) {
    // Standardizes to properly replace whole words during paramValue replacing.
    let output = inputTextLine.replace(/ = /g, "=");

    // Tries to split by both '<' and '>' via RegEx.
    output = output.split(/[<>]+/);

    const outputLength = output.length;
    for (let i = 0; i < outputLength; i++) {
        if (i % 2 === 1) {
            continue;
        }

        // Handles lines with multiple param-value combinations.
        const allParams = splitParamsFromLine(output[i]);

        // It's an empty line.
        if (!allParams) {
            continue;
        }

        for (const [paramName, paramValue] of allParams) {
            let lowercase = paramName.toLowerCase();
            
            if (exceptions.has(lowercase)) {
                // 'exceptions.get(lowercase)' is the function that handles the entire 'output[i]'.
                output[i] = exceptions.get(lowercase)(output[i]);
                continue;
            }

            if (parameters.has(lowercase)) {
                output[i] = output[i].replace(`${paramName}=`, `${parameters.get(lowercase)}=`);
            }

            // Splits by ':', '|' and ', ' to catch [[File]], (Notes) and multiple values.
            const paramValues = paramValue.split(/, |:|\(/);

            for (const elem of paramValues) {
                lowercase = elem.toLowerCase();

                const lastChar = lowercase.slice(-1);
                
                // Handles (Noted) and other variants.
                if (lastChar === ')') {
                    lowercase = lowercase.slice(0, -1);
                    if (parameters.has(lowercase)) {
                        output[i] = output[i].replace(`${elem}`, `${parameters.get(lowercase)})`);
                        continue;
                    }
                }

                // Handles {{DropsLine}} and such, that end with }}.
                if (lastChar === '}') {
                    lowercase = lowercase.slice(0, -2);
                    if (parameters.has(lowercase)) {
                        output[i] = output[i].replace(`=${elem}`, `=${parameters.get(lowercase)}}}`);
                        continue;
                    }
                }

                if (parameters.has(lowercase)) {
                    output[i] = output[i].replace(`=${elem}`, `=${parameters.get(lowercase)}`);
                    continue;
                }

                // Most likely, it's an item name if it made it here.
                if (itemNames.has(lowercase)) {
                    output[i] = output[i].replace(elem, itemNames.get(lowercase));
                    continue;
                }

                // Past here, it'll try to scavenge the string to remove any gunk.
                const scavengedString = paramValuesTrie.removeSymbols(elem);
                lowercase = scavengedString.toLowerCase();

                // Sometimes, stuff like (melee) on image names will make it down here.
                if (parameters.has(lowercase)) {
                    output[i] = output[i].replace(scavengedString, parameters.get(lowercase));
                    continue;
                }

                if (itemNames.has(lowercase)) {
                    output[i] = output[i].replace(scavengedString, itemNames.get(lowercase));
                    continue;
                }

                if (npcNames.has(lowercase)) {
                    output[i] = output[i].replace(scavengedString, npcNames.get(lowercase));
                    continue;
                }
            }
        }    
    }

    // Joins 'output' by alternating between angle brackets.
    return output.reduce((acc, curr, index) => { return index === 0 ? curr : `${acc}${index % 2 === 0 ? '>' : '<'}${curr}` }, '');
}

export function translate(inputText) {
    // Needs to be splitted by newlines to catch the end of a predef/infobox.
    inputText = inputText.split('\n').map(handleParameters).join('\n');
    return translatePredefNames(inputText);
}