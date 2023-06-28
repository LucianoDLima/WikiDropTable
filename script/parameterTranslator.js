import * as tp from './parameters.js';

const monsterAndNpc = {
    ...tp.infoboxMonster,
    ...tp.infoboxNPC
}

const recipeSkillNames = {
    ...tp.infoboxRecipe,
    ...tp.skillNames
}

const shopAndDrop = {
    ...tp.dropTableHead,
    ...tp.infoboxShop
}

const allTemplates = {
    ...tp.dropTableHead,
    ...tp.infoboxItem,
    ...tp.infoboxRecipe,
    ...tp.skillNames,
    ...tp.updateHistory,
    ...tp.infoboxSummoning,
    ...tp.infoboxMonster,
    ...tp.infoboxNPC,
    ...tp.infoboxShop
}

/**
 * Translates parameters in the input text based on the @parameterToBeTranslated object.
 */
export function translateParameters(inputText) {
    switch (true) {
        case inputText.includes('{{Infobox Monster new'):
        case inputText.includes('{{Infobox NPC'):
            return handleParameters(inputText, monsterAndNpc);
        
        case inputText.includes('{{Infobox familiar'):
        case inputText.includes('{{Infobar Summon Pouch'):
        case inputText.includes('{{Infobox Summon scroll'):
            return handleParameters(inputText, tp.infoboxSummoning);

        case inputText.includes('{{infobox item'):
            return handleParameters(inputText, tp.infoboxItem);
        
        case inputText.includes('==Creation=='):
        case inputText.includes('Infobox Recipe'):
            return handleParameters(inputText, recipeSkillNames);
            
        case inputText.includes('===Main drops==='):
        case inputText.includes('===Secondary drops==='):
        case inputText.includes('{{DropsTableHead}}'):
            return handleParameters(inputText, tp.dropTableHead);
        
        case inputText.includes('==Update history=='):
        case inputText.includes('{{UH|'):
            return handleParameters(inputText, tp.updateHistory);

        case inputText.includes('{{Infobox loja'):
            return handleParameters(inputText, shopAndDrop);
    }
        
    return handleParameters(inputText, allTemplates);
}

function handleParameters(inputText, templates) {
    // Splits by both '<' and '>' via RegEx.
    let output = inputText.split(/[<>]+/);

    output = handleParamaterToBeTranslated(output, output.length, templates);

    // Joins 'output' by alternating between angle brackets.
    return output.reduce((acc, curr, index) => {
        if (index === 0) {
          return curr;
        }
        return `${acc}${index % 2 === 0 ? '>' : '<'}${curr}`;
    }, '');
};

function handleParamaterToBeTranslated(output, outputLength, paramaterToBeTranslated) {
    for (let parameter in paramaterToBeTranslated) {
        // Insensitive case regex that matches any digits at the end of the string.
        const regex = new RegExp(`\\b${parameter}\\b\\d*`, 'ig');

        // Extract any digits at the end of the match and append them to the replacement string.
        const digits = parameter.match(/\d+$/);
        const translated = paramaterToBeTranslated[parameter] + (digits ? digits[0] : '');

        for (let i = 0; i < outputLength; i++) {
            if (i % 2 === 0) {
                // Finds all matching patterns of 'date = 12 June 2023'.
                let exceptionRegexDate = /date\s*=\s*(\d+)\s+([\w\s]+)\s+(\d+)/ig;
                let matchesDate = output[i].matchAll(exceptionRegexDate);
                
                for (let match of matchesDate) {
                    const [day, month, year] = match;
                    const exceptionReplacementDate = `data={{Data|${day}|${month.toLowerCase()}|${year}}}`;
                    output[i] = output[i].replace(match[0], exceptionReplacementDate);
                }

                // Finds all matching patterns of the 'release' parameter '([Day Month] [Year])'.
                let exceptionRegexRelease = /release\s*=\s*\[\[([\w\s]+)\]\]\s*\[\[([\w\s]+)\]\]/ig;
                let matchesRelease = output[i].matchAll(exceptionRegexRelease);

                for (let match of matchesRelease) {
                    const dayMonth = match[1].trim();
                    const year = match[2].trim();
                    const [day, month] = dayMonth.split(' ');
                    const exceptionReplacementRelease = `release = {{Data|${day}|${month.toLowerCase()}|${year}}}`;
                    output[i] = output[i].replace(match[0], exceptionReplacementRelease);
                }

                // If no exceptions are found, perform regular translation.
                if (matchesDate.length == null && matchesRelease.length == null) {
                    output[i] = output[i].replace(regex, translated);
                }
            }
        }
    }

    return output;
}