import { parameters, infoboxes } from './parameters.js';

const exceptions = new Map([
    ['date', dateException],
    ['release', releaseException]
]);

function dateException(text) {
    // Finds all matching patterns of 'date = 12 June 2023'.
    return text.replace(/date\s*=\s*(\d+)\s+([\w\s]+)\s+(\d+)/ig, (_, day, month, year) => {
        return `data = {{Data|${day}|${month.toLowerCase()}|${year}}}`;
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
        return `lançamento = {{Data|${day}|${months.get(month.toLowerCase())}|${year.trim()}}}`;
    });
}

export function translateParameters(inputText) {
    let inputTextLines = inputText.split('\n');

    // Applies 'handleParameters()' to each line of inputTextLines.
    inputTextLines = inputTextLines.map(handleParameters).join('\n');

    // Searches as many predef/infobox names from the known ones at infoboxes. 
    const predefNames = Array.from(infoboxes.keys()).filter(key => new RegExp(key, 'i').test(inputText));
    console.log(predefNames);

    if (predefNames != null) {
        predefNames.forEach(
            // Translates as many occurrences of all predef/infobox names found as possible.
            element => inputTextLines = inputTextLines.replace(new RegExp(element, 'g'), infoboxes.get(element))
        );
    }

    return inputTextLines;
}

function splitLineParameters(paramLine) {
    let params = paramLine.split(/[|=]+/);
    if (params.length === 1) {
        return false;
    }
    // Groups paramName and paramValue together, whilist also getting rid of the first element.
    // The first element here is either an empty string or the predef name, which gets replaced at the end.
    return Array.from({ length: (params.length - 1) / 2 }, (_, i) => [params[i * 2 + 1].trim(), params[i * 2 + 2].trim()]);
}

function handleParameters(inputText) {
    // Tries to split by both '<' and '>' via RegEx.
    let output = inputText.split(/[<>]+/) || [output];
    const outputLength = output.length;

    for (let i = 0; i < outputLength; i++) {
        if (i % 2 === 1) {
            continue;
        }

        // Handles lines with multiple param-value combinations.
        const allParams = splitLineParameters(output[i]);

        // It's an empty line.
        if (!allParams) {
            continue;
        }

        for (const [paramName, paramValue] of allParams) {
            const lowercaseParamName = paramName.toLowerCase(); 
            
            if (exceptions.has(lowercaseParamName)) {
                // 'exceptions.get(paramName)' is the function that handles the entire 'output[i]'.
                output[i] = exceptions.get(lowercaseParamName)(output[i]);
                continue;
            }

            if (parameters.has(lowercaseParamName)) { 
                output[i] = output[i].replace(paramName, parameters.get(lowercaseParamName));
            }

            if (paramValue == null) {
                continue;
            }

            // Splits by both ', ' and ':' to catch multiple values or [[File]].
            let splittedParamValue = paramValue.split(/, |:/);

            for (const elem of splittedParamValue) {
                let lowercase = elem.toLowerCase();

                // Handles {{DropsLine}} and such, that end with }}.
                if (lowercase.endsWith('}}')) {
                    lowercase = lowercase.replace('}}', '');
                    output[i] = parameters.has(lowercase) ? output[i].replace(elem, `${parameters.get(lowercase)}}}`) : output[i];
                } else {
                    output[i] = parameters.has(lowercase) ? output[i].replace(elem, parameters.get(lowercase)) : output[i];
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