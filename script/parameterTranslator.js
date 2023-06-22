/**
 * Translates parameters in the input text based on the @parameterToBeTranslated object.
 */
export const translateParameters = (
    inputDrops,
    outputDrops,
    paramaterToBeTranslated,
    paramaterToBeTranslated2
) => {
    // Splits by both '<' and '>' via RegEx.
    let output = inputDrops.value.split(/[<>]+/);
    const outputLength = output.length;

    const parametersToCheck = [
        paramaterToBeTranslated,
        paramaterToBeTranslated2
    ];

    parametersToCheck.forEach((params) => {
        handleParamaterToBeTranslated(output, outputLength, params);
    });

    // Joins 'output' by alternating between angle brackets.
    outputDrops.value = output.reduce((acc, curr, index) => {
        if (index === 0) {
            return curr;
        }
        return acc + (index % 2 === 0 ? '>' : '<') + curr;
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
                // Handle exception for 'date' parameter (Day Month)
                let exceptionRegexDate = /date\s*=\s*(\d+)\s+([\w\s]+)\s+(\d+)/ig;
                let matchesDate = output[i].matchAll(exceptionRegexDate);
                let replacedDate = false;
                
                for (let match of matchesDate) {
                    const day = match[1];
                    const month = match[2];
                    const year = match[3];
                    const exceptionReplacementDate = `data={{Data|${day}|${month.toLowerCase()}|${year}}}`;
                    output[i] = output[i].replace(match[0], exceptionReplacementDate);
                    replacedDate = true;
                }

                // Handle exception for 'release' parameter ([Day Month] [Year])
                let exceptionRegexRelease = /release\s*=\s*\[\[([\w\s]+)\]\]\s*\[\[([\w\s]+)\]\]/ig;
                let matchesRelease = output[i].matchAll(exceptionRegexRelease);
                let replacedRelease = false;

                for (let match of matchesRelease) {
                    const dayMonth = match[1].trim();
                    const year = match[2].trim();
                    const [day, month] = dayMonth.split(' ');
                    const exceptionReplacementRelease = `release = {{Data|${day}|${month.toLowerCase()}|${year}}}`;
                    output[i] = output[i].replace(match[0], exceptionReplacementRelease);
                    replacedRelease = true;
                }

                // If no exceptions are found, perform regular translation
                if (!replacedDate && !replacedRelease) {
                    output[i] = output[i].replace(regex, translated);
                }
            }
        }
    }
}