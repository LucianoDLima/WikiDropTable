/**
 * Translates parameters in the input text based on the @parameterToBeTranslated object.
 */
export const parameterTranslator = (
    inputDrops,
    outputDrops,
    paramaterToBeTranslated,
    paramaterToBeTranslated2,
    paramaterToBeTranslated3,
    paramaterToBeTranslated4
) => {
    // Splits by both '<' and '>' via RegEx.
    let output = inputDrops.value.split(/[<>]+/);
    const outputLength = output.length;

	// Currently, all parameters are being called, which may potentially slow down the app (it will :p).
	// This will be addressed when implementing buttons to manage the selection of parameters tho.
	// Reminder: Remove all the paramaterToBeTranslated followed by numbers.

	handleParamaterToBeTranslated(output, outputLength, paramaterToBeTranslated)
	handleParamaterToBeTranslated(output, outputLength, paramaterToBeTranslated2)
	handleParamaterToBeTranslated(output, outputLength, paramaterToBeTranslated3)
	handleParamaterToBeTranslated(output, outputLength, paramaterToBeTranslated4)

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
