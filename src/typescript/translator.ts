import { parameters, infoboxes } from './parameters';
import { itemNames, npcNames } from './items';
import { paramValuesTrie } from './trie';
import { infoboxesTrie } from './trie';
import { showLinks } from './textOptions';

const exceptions: Map<string, Function> = new Map([
    ['date', dateException],
    ['release', releaseException],
    ['exchange', mercadoException],
    ['gemw', mercadoException],
]);

function dateException(text: string): string {
    // Finds all matching patterns of 'date = 12 June 2023'.
    return text.replace(/date\s*=\s*(\d+)\s+([\w\s]+)\s+(\d+)/gi, (_, day, month, year) => {
        return `data={{Data|${day}|${month.toLowerCase()}|${year}}}`;
    });
}

function releaseException(text: string): string {
    const months: Map<string, string> = new Map([
        ['january', 'Janeiro'],
        ['february', 'Fevereiro'],
        ['march', 'Março'],
        ['april', 'Abril'],
        ['may', 'Maio'],
        ['june', 'Junho'],
        ['july', 'Julho'],
        ['august', 'Agosto'],
        ['september', 'Setembro'],
        ['october', 'Outubro'],
        ['november', 'Novembro'],
        ['december', 'Dezembro'],
    ]);

    // Finds all matching patterns of the 'release' parameter '([Day Month] [Year])'.
    return text.replace(/release\s*=\s*\[\[([\w\s]+)\]\]\s*\[\[([\w\s]+)\]\]/gi, (_, dayMonth, year) => {
        const [day, month] = dayMonth.trim().split(' ');
        return `lançamento={{Data|${day}|${months.get(month.toLowerCase())}|${year.trim()}}}`;
    });
}

function mercadoException(text: string): string {
    const gemwMatch = text.match(/\|(exchange|gemw)=([^|\[\]]+)/gi);

    // Return the original text if there is no 'exchange' or 'gemw' param in the text.
    if (!gemwMatch) return text;

    const gemw = gemwMatch[0];

    if (gemw.slice(-2) === '}}') {
        return text.replace(gemw, '|mercado=gemw}}');
    }

    return text.replace(gemw, '|mercado=gemw');
}

function groupParams(params: string[]): [string, string][] {
    return Array.from(
        // Groups paramName and paramValue together.
        { length: (params.length - 1) / 2 },
        (_, i) => [params[i * 2 + 1].trim(), params[i * 2 + 2].trim()]
    );
}

function splitParamsFromLine(paramLine: string): [string, string] | boolean | [string, string][] | [string, [string, string][]]  {
    // Splits by both '|' and '=' to separate all params in a line.
    const params = paramLine.split(/[|=]+/);

    if (params.length === 1) {
        // Returns a dummy array in case the line is a single infobox, like '{{DropsTableHead}}'.
        return params[0].length === 0 ? false : [params[0], ''];
    }

    // If the line starts with a infobox/param name (most likely).
    if (params[0].length !== 0) {
        return [params[0], groupParams(params)];
    }

    return groupParams(params);
}

function handleParamName(paramName: string, outputLine: string): string {
    if (exceptions.has(paramName)) {
        const exceptionFunction = exceptions.get(paramName);
        if (typeof exceptionFunction === 'function') {
            return exceptionFunction(outputLine);
        }
    }

    if (parameters.has(paramName)) {
        return outputLine.replace(`${paramName}=`, `${parameters.get(paramName)}=`);
    }

    // Handles parameters with numbers, like 'image1='.
    const versionNumber = paramName.slice(-1);
    if (!isNaN(Number(versionNumber))) {
        const withoutNumber = paramName.slice(0, -1);
        if (parameters.has(withoutNumber)) {
            return outputLine.replace(`${paramName}=`, `${parameters.get(withoutNumber)}${versionNumber}=`);
        }
    }

    return outputLine;
}

function removeGunk(text: string): string {
    // In case it's some edge-case like '2 [[Hellfire metal]]'.
    if (/^\d+\s/.test(text)) {
        // Splits by the first whitespace.
        const temp = text.split(/\s+(.+)/)[1];

        // Stuff like '6 (noted)' become '6 ' after splitting,
        // meaning the element at index 1 is undefined.
        if (temp != undefined) return paramValuesTrie.removeSymbols(temp);
    }

    return paramValuesTrie.removeSymbols(text);
}

function handleParamValue(paramValue: any, outputLine: any): string {
    // Splits by ':', '(' and ', ' to catch [[File]], (Notes) and multiple values.
    const paramValues = paramValue.split(/, |:|\(/);

    for (const [index, elem] of paramValues.entries()) {
        const lastChar = elem.slice(-1);

        // Handles (Noted) and other variants.
        if (lastChar === ')') {
            const reduced = elem.slice(0, -1);

            // In case the paramValue is a potion with a dosage (x).
            if (!reduced.isNaN) {
                if (index > 0) {
                    const itemName = `${paramValues[index - 1]}(${reduced})`;
                    if (itemNames.has(itemName)) {
                        outputLine = outputLine.replace(itemName, itemNames.get(itemName));
                        continue;
                    }
                }
            }

            if (parameters.has(reduced)) {
                outputLine = outputLine.replace(elem, `${parameters.get(reduced)})`);
                continue;
            }
        }

        // Handles {{DropsLine}} and such, that end with }}.
        if (lastChar === '}') {
            const reduced = elem.slice(0, -2);
            if (parameters.has(reduced)) {
                outputLine = outputLine.replace(`=${elem}`, `=${parameters.get(reduced)}}}`);
                continue;
            }

            // {{ShopsLine}} may have an item name right at the end. Who'd have thunk?
            if (itemNames.has(reduced)) {
                outputLine = outputLine.replace(`=${elem}`, `=${itemNames.get(reduced)}}}`);
                continue;
            }
        }

        if (parameters.has(elem)) {
            // Properly translate entire words on lines that have multiple params.
            outputLine = index === 0 ? outputLine.replace(`=${elem}`, `=${parameters.get(elem)}`) : outputLine.replace(`, ${elem}`, `, ${parameters.get(elem)}`);
            continue;
        }

        // Most likely, it's an item name if it made it here.
        if (itemNames.has(elem)) {
            outputLine = outputLine.replace(elem, itemNames.get(elem));
            continue;
        }

        // Past here, it'll try to scavenge the string to remove any gunk.
        const scavengedString = removeGunk(elem);

        // Potions in lines with multiple images may get here.
        if (parseInt(scavengedString)) {
            if (index > 0) {
                const elementBefore = paramValuesTrie.removeSymbols(paramValues[index - 1]);
                const potionName = `${elementBefore}(${scavengedString})`;

                if (itemNames.has(potionName)) {
                    outputLine = outputLine.replace(potionName, itemNames.get(potionName));
                    continue;
                }
            }
        }

        // Sometimes, stuff like (melee) on image names will make it down here.
        if (parameters.has(scavengedString)) {
            outputLine = outputLine.replace(scavengedString, parameters.get(scavengedString));
            continue;
        }

        if (itemNames.has(scavengedString)) {
            outputLine = outputLine.replace(scavengedString, itemNames.get(scavengedString));
            continue;
        }

        if (npcNames.has(scavengedString)) {
            outputLine = outputLine.replace(scavengedString, npcNames.get(scavengedString));
        }
    }

    return outputLine;
}

function handleInputLine(inputTextLine: string): string {
    // Hard-coded exception to handle {{NPC map}}, as it breaks the whole code.
    if (inputTextLine.toLowerCase().includes('npc map')) {
        const paramName = inputTextLine.split('=')[0].slice(1).trim();
        const paramValue = inputTextLine.replace(' = ', '=');
        return handleParamName(paramName, paramValue);
    }

    // Standardizes to properly replace whole words during paramValue replacing.
    // Also tries to split by both '<' and '>' to skip refNotes.
    const output = inputTextLine.replace(/ = /g, '=').split(/[<>]+/);
    const outputLength = output.length;

    for (let i = 0; i < outputLength; i++) {
        // Any refNotes will be left on odd indexes.
        if (i % 2 === 1) continue;

        // Handles lines with multiple param-value combinations.
        let allParams: any = splitParamsFromLine(output[i]);

        // It's an empty line.
        if (!allParams) continue;

        // If there's an infobox/predef name to be translated.
        if (allParams.length === 2) {
            const infoboxName = infoboxesTrie.removeSymbols(allParams[0]);

            if (infoboxes.has(infoboxName)) {
                const predef = infoboxes.get(infoboxName);

                if (showLinks) {
                    const link = `<a href="#" data-url="https://pt.runescape.wiki/w/Predefini%C3%A7%C3%A3o:${predef}">${predef}</a>`;
                    output[i] = output[i].replace(infoboxName, link);
                } else {
                    output[i] = output[i].replace(infoboxName, predef);
                }
            }

            allParams = allParams[1];
        }

        for (const [paramName, paramValue] of allParams) {
            output[i] = handleParamName(paramName, output[i]);
            output[i] = handleParamValue(paramValue, output[i]);
        }
    }

    // Joins 'output' by alternating between angle brackets.
    return output.reduce((acc: string, curr: string, index: number) => {
        return index === 0 ? curr : `${acc}${index % 2 === 0 ? '>' : '<'}${curr}`;
    }, '');
}

export function translate(inputText: string): string[] {
    // Needs to split by newlines to catch the end of a predef/infobox.
    return inputText.split('\n').map(handleInputLine);
}
