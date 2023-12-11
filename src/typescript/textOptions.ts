const showLinksToggle: HTMLInputElement = document.querySelector('#showLinksToggle')!;
const showHighlightToggle: HTMLInputElement = document.querySelector('#showHighlightToggle')!;
const showExamineToggle: HTMLInputElement = document.querySelector('#showExamineToggle')!;
const showExamineListItem: HTMLElement = document.getElementById('showExamineOption')!;

export let showLinks: boolean;
export let showHighlight: boolean;
export let showExamine: boolean;

showLinksToggle.addEventListener('change', (event: Event): void => {
    showLinks = (event.currentTarget as HTMLInputElement).checked;
    localStorage.setItem('showLinksKey', showLinks.toString());
});

showHighlightToggle.addEventListener('change', (event: Event): void => {
    showHighlight = (event.currentTarget as HTMLInputElement).checked;
    localStorage.setItem('showHighlightKey', showHighlight.toString());
    showExamineListItem.className = showHighlight ? '' : 'options-list--disabled';
});

showExamineToggle.addEventListener('change', (event: Event): void => {
    showExamine = (event.currentTarget as HTMLInputElement).checked;
    localStorage.setItem('showExamineKey', showExamine.toString());
});

function fetchDefaultValues(): void {
    const linksKey = localStorage.getItem('showLinksKey');
    const highlightKey = localStorage.getItem('showHighlightKey');
    const examineKey = localStorage.getItem('showExamineKey');

    if (linksKey) {
        showLinks = linksKey === 'true';
    } else {
        showLinks = true;
        localStorage.setItem('showLinksKey', 'true');
    }

    if (highlightKey) {
        showHighlight = highlightKey === 'true';
    } else {
        showHighlight = false;
        localStorage.setItem('showHighlightKey', 'true');
    }

    if (examineKey) {
        showExamine = examineKey === 'true';
    } else {
        showExamine = false;
        localStorage.setItem('showExamineKey', 'true');
    }

    showLinksToggle.checked = showLinks;
    showHighlightToggle.checked = showHighlight;
}

fetchDefaultValues();