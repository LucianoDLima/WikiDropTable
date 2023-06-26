import * as tp from './parameters.js';
import { translateParameters } from './parameterTranslator.js';
import { translateItemNames } from './itemTranslator.js';
import { itemNames, npcNames } from './items.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');
const uhButton = document.querySelector('#uh-button');
const uhInputs = document.querySelector('[data-uh]');

const websiteButtons = document.querySelectorAll('[data-filter="website"]');
const dayButtons = document.querySelectorAll('[data-filter="days"]')
const monthButtons = document.querySelectorAll('[data-filter="months"]')
const yearButtons = document.querySelectorAll('[data-filter="years"]')
const searchButton = document.querySelector('[data-filter="search"]')

// It looks for the appropriate template to translate based on some key words.
function handleInput() {
    const inputContent = inputDrops.value;
    const lines = inputContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let caseFound = false; 

        switch (line) {
            case '{{Infobox Monster new':
            case '{{Infobox NPC':
                translateParameters(inputDrops, outputDrops, tp.general, tp.infoboxMonster, tp.infoboxNPC)
                caseFound = true;
                break
            
            case '{{Infobox familiar':
            case '{{Infobar Summon Pouch':
            case '{{Infobox Summoning scroll':
                translateParameters(inputDrops, outputDrops, tp.general, tp.infoboxSummoning);
                caseFound = true;
                break;

            case '{{infobox item':
                translateParameters(inputDrops, outputDrops, tp.general, tp.infoboxItem);
                caseFound = true;
                break;
            
            case '==Creation==':
            case 'Infobox Recipe':
                translateParameters(inputDrops, outputDrops, tp.general, tp.infoboxRecipe, tp.skillNames);
                caseFound = true;
                break;
                
            case '===Main drops===':
            case '===Secondary drops===':
            case '{{DropsTableHead}}':
                translateParameters(inputDrops, outputDrops, tp.general, tp.dropTableHead);
                caseFound = true;
                break;
            
            case '==Update history==':
            case '{{UH|':
                translateParameters(inputDrops, outputDrops, tp.general, tp.updateHistory);
                caseFound = true;
                break;
        }

        if (caseFound) {
            break; 
        }

        translateParameters(inputDrops, outputDrops, tp.general, tp.dropTableHead, tp.infoboxItem, tp.infoboxRecipe, tp.infoboxSummoning, tp.updateHistory, tp.skillNames, tp.infoboxMonster, tp.infoboxNPC);
    }
}

inputDrops.addEventListener('input', () => {
    outputDrops.value = inputDrops.value;
    
    handleInput()
    translateItemNames(outputDrops, npcNames);
    translateItemNames(outputDrops, itemNames);
});

outputDrops.addEventListener('click', () => {
    outputDrops.select();
    document.execCommand('copy');

    // Unselect it all after copying
    const selection = window.getSelection();
    selection.removeAllRanges();

    setTimeout(() => {
        outputDrops.textContent = outputDrops.value;
    }, 1500);
});

uhButton.addEventListener('click', () => {
    uhButton.classList.toggle('active')
    uhInputs.classList.toggle('active')
})

let website = '';
let day = ''
let month = ''
let year = ''

const monthList = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'November', 'Dezembro' 
]
const yearList = [
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
]

function handleSearchButtons(selected) {
    const dayArray = Array.from(dayButtons)
    const monthArray = Array.from(monthButtons)
    const yearArray = Array.from(yearButtons)

    selected.forEach((button) => {
        button.addEventListener('click', (e) => {
            selected.forEach((buttons) => {
                buttons.classList.remove('active');
            });
    
            button.classList.add('active');
            
            switch (e.target.getAttribute('data-filter')) {
                case 'website':
                    website = e.target.textContent
                    break;
                    
                case 'days':
                    day = dayArray.indexOf(e.target)
                    break;
                case 'months':
                    month = monthArray.indexOf(e.target)
                    break;
                case 'years': 
                    year = yearArray.indexOf(e.target)
                    break
                default:
                    console.error('Something went wrong.');
                    break;
            }
    
        });
    });
}

handleSearchButtons(websiteButtons)
handleSearchButtons(dayButtons)
handleSearchButtons(monthButtons)
handleSearchButtons(yearButtons)



searchButton.addEventListener('click', () => {
    let officialWebsite = `https://secure.runescape.com/m=news/l=3/a=9/archive?year=${yearList[year]}&month=${month + 1}&filter=Filtrar`
    let wikiWebsite = `https://pt.runescape.wiki/w/${day + 1}_de_${monthList[month]?.toLowerCase()}`

    console.log(website);
    switch (website) {
        case 'Wiki':
            window.open(wikiWebsite, '_blank');
            break;
        
        case 'Official':
            window.open(officialWebsite, '_blank');
            break;

        case 'Both':
            setTimeout(() => {
                window.open(officialWebsite, '_blank');
            }, 100);
            
            setTimeout(() => {
                window.open(wikiWebsite, '_blank');
            }, 200);
            break;
        default:
            console.error('You must select the preferred website');
            break;
    }
})

// Closes if clicked outside the UH container
document.body.addEventListener('click', (e) => {
    if(!e.target.closest('.active')) {
        uhButton.classList.remove('active')
        uhInputs.classList.remove('active')
    }
})