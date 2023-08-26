const showIconsToggle: HTMLInputElement = document.getElementById('showIconsToggle') as HTMLInputElement;
const showDetailedToggle: HTMLInputElement = document.getElementById('showDetailedToggle') as HTMLInputElement;
const showDetailedListItem: HTMLElement = document.getElementById('showDetailedOption')!;

export let showIcons: boolean;
export let showDetailed: boolean;

showIconsToggle.addEventListener('change', (event: Event): void => {
    showIcons = (event.currentTarget as HTMLInputElement).checked;
    localStorage.setItem('showIconsKey', showIcons.toString());
    showDetailedListItem.className = showIcons ? '' : 'options-list--disabled';
});

showDetailedToggle.addEventListener('change', (event: Event): void => {
    showDetailed = (event.currentTarget as HTMLInputElement).checked;
    localStorage.setItem('showDetailedKey', showDetailed.toString());
});

function fetchDefaultValues(): void {
    const iconsKey = localStorage.getItem('showIconsKey');
    const detailedKey = localStorage.getItem('showDetailedKey');

    if (iconsKey) {
        // Scuffed way of converting string to bool, but whatever.
        showIcons = iconsKey === 'true';
    } else {
        showIcons = true;
        localStorage.setItem('showIconsKey', 'true');
    }

    if (detailedKey) {
        showDetailed = detailedKey === 'true';
    } else {
        showDetailed = false;
        localStorage.setItem('showDetailedKey', 'false');
    }

    showIconsToggle.checked = showIcons;
    showDetailedToggle.checked = showDetailed;
    showDetailedListItem.className = showIcons ? '' : 'options-list--disabled';
}

fetchDefaultValues();