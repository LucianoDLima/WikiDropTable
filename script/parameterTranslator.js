/**
 * Translates parameters in the input text based on the @parameterToBeTranslated object.
 * Ignores translation within the angle brackets ("<" and ">").
 */
export const parameterTranslator = (
    inputDrops,
    outputDrops,
    paramaterToBeTranslated
) => {
    // Splits by both '<' and '>' via RegEx.
    let output = inputDrops.value.split(/[<>]+/);
    const outputLength = output.length;

	handleParamaterToBeTranslated(output, outputLength, paramaterToBeTranslated)

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
        const translated =
            paramaterToBeTranslated[parameter] + (digits ? digits[0] : '');

        for (let i = 0; i < outputLength; i++) {
            // Everything between angle brackets are on odd indexes inside 'output'.
            if (i % 2 == 0) {
                output[i] = output[i].replace(regex, translated);
            }
        }
    }
}
