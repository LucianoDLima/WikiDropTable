import { parameters, infoboxes } from './parameters.js';

const exceptions = new Map([
    ['date', dateException],
    ['release', releaseException]
]);

function dateException(text) {
    // Finds all matching patterns of 'date = 12 June 2023'.
    const exceptionRegexDate = /date\s*=\s*(\d+)\s+([\w\s]+)\s+(\d+)/ig;
    const matchesDate = text.matchAll(exceptionRegexDate);
    
    for (const match of matchesDate) {
        const [day, month, year] = match;
        text = text.replace(match[0], `data={{Data|${day}|${month.toLowerCase()}|${year}}}`);
    }

    return text;
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
    const exceptionRegexRelease = /release\s*=\s*\[\[([\w\s]+)\]\]\s*\[\[([\w\s]+)\]\]/ig;
    const matchesRelease = text.matchAll(exceptionRegexRelease);

    for (const match of matchesRelease) {
        const dayMonth = match[1].trim();
        const year = match[2].trim();
        const [day, month] = dayMonth.split(' ');
        text = text.replace(match[0], `release = {{Data|${day}|${months.get(month.toLowerCase())}|${year}}}`);
    }

    return text;
}

export function translateParameters(inputText) {
    let inputTextLines = inputText.split('\n');
    const linesLength = inputTextLines.length;

    // Searches the predef/infobox name from the known ones at infoboxes.
    const predefName = [...infoboxes.keys()].find(key => inputTextLines[0].includes(key)) || false;

    if (predefName) {
        inputTextLines[0] = inputTextLines[0].replace(predefName, infoboxes.get(predefName));
    }

    for (let i = 0; i < linesLength; i++) {
        inputTextLines[i] = handleParameters(inputTextLines[i]);
    }

    return inputTextLines.join('\n');
}

function splitLineParameters(paramLine) {
    let params = paramLine.split(/[|=]+/);
    if (params.length === 1) {
        return false;
    }
    // Groups paramName and paramValue together, whilist also getting rid of the first element (that is useless).
    return Array.from({ length: (params.length - 1) / 2 }, (_, i) => [params[i * 2 + 1].trim(), params[i * 2 + 2].trim()]);
}

function handleParameters(inputText) {
    // Tries to split by both '<' and '>' via RegEx.
    let output = inputText.split(/[<>]+/) || [output];
    const outputLength = output.length;

    for (let i = 0; i < outputLength; i++) {
        if (i % 2 === 0) {
            // Handles lines with multiple param-value combinations.
            const allParams = splitLineParameters(output[i]);

            if (!allParams) {
                continue;
            }
            
            for (const [paramName, paramValue] of allParams) {
                if (exceptions.has(paramName)) {
                    // 'exceptions.get(paramName)' is the function that handles the entire 'output[i]'.
                    output[i] = exceptions.get(paramName)(output[i]);
                    continue;
                } 
                
                if (parameters.has(paramName)) {
                    output[i] = output[i].replace(paramName, parameters.get(paramName));
                }

                if (paramValue != null) {
                    // Splits by both ', ' and ':' to catch multiple values or [[File]].
                    let splittedParamValue = paramValue.split(/, |:/);

                    for (const elem of splittedParamValue) {
                        let lowercase = elem.toLowerCase();

                        // Handles having }} at the end of the line.
                        if (lowercase.endsWith('}}')) {
                            lowercase = lowercase.replace('}}', '');
                            if (parameters.has(lowercase)) {
                                output[i] = output[i].replace(elem, `${parameters.get(lowercase)}}}`);
                            }
                            continue;
                        }

                        if (parameters.has(lowercase)) {      
                            output[i] = output[i].replace(elem, parameters.get(lowercase));
                        }
                    }
                }
            }
        }
    }

    // Joins 'output' by alternating between angle brackets.
    return output.reduce((acc, curr, index) => {
        if (index === 0) {
          return curr;
        }
        return `${acc}${index % 2 === 0 ? '>' : '<'}${curr}`;
    }, '');
};