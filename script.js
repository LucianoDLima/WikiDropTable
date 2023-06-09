import { dropTableHead } from './translation.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

const parameterTranslator = (parameterToTranslate) => {
  // Loop through the parameters to apply their respective replacements
  for (const parameter in parameterToTranslate) {
    // Insensitive case regex that matches any digits at the end of the string
    const regex = new RegExp(`\\b${parameter}\\b\\d*`, 'ig');
    outputDrops.value = outputDrops.value.replace(regex, (match) => {
      // Extract any digits at the end of the match and append them to the replacement string
      const digits = match.match(/\d+$/);
      return parameterToTranslate[parameter] + (digits ? digits[0] : '');
    });
  }
};

const translateTheRestOfThisThing = async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data);
    
  } catch (error) {
    console.error('Error loading JSON file:', error);
  }
};

inputDrops.addEventListener('mouseover', () => {
  outputDrops.value = inputDrops.value;

  parameterTranslator(dropTableHead);
  translateTheRestOfThisThing();
});
