/**
 * Translates parameters in the input text based on the @parameterToBeTranslated object.
 */
export function translateParameters(inputText, templates) {
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
        const regex = new RegExp(`\\b${parameter}\\b\\d*`);

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