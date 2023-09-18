const showLinksToggle: HTMLInputElement = document.querySelector('#showLinksToggle')!;
const showHighlightToggle: HTMLInputElement = document.querySelector('#showHighlightToggle')!;

export let showLinks: boolean;
export let showHighlight: boolean;

showLinksToggle.addEventListener('change', (event: Event): void => {
    showLinks = (event.currentTarget as HTMLInputElement).checked;
    localStorage.setItem('showLinksKey', showLinks.toString());
});

showHighlightToggle.addEventListener('change', (event: Event): void => {
    showHighlight = (event.currentTarget as HTMLInputElement).checked;
    localStorage.setItem('showHighlightKey', showHighlight.toString());
});

function fetchDefaultValues(): void {
    const linksKey = localStorage.getItem('showLinksKey');
    const highlightKey = localStorage.getItem('showHighlightKey');

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

    showLinksToggle.checked = showLinks;
    showHighlightToggle.checked = showHighlight;
}

fetchDefaultValues();