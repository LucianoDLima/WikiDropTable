const reduceAnimsToggle: HTMLInputElement = document.getElementById('reduceAnimsToggle') as HTMLInputElement;

export let reduceAnims: boolean;

reduceAnimsToggle.addEventListener('change', (event: Event): void => {
    reduceAnims = (event.currentTarget as HTMLInputElement).checked;
    localStorage.setItem('reduceAnimsKey', reduceAnims.toString());

    if (reduceAnims) {
        const allWindowsWithHideClass: NodeListOf<HTMLDivElement> = 
            document.querySelectorAll('.menu-line__popup-window--hide');

        allWindowsWithHideClass.forEach((popupWindow: HTMLDivElement): void =>
            popupWindow.classList.remove('menu-line__popup-window--hide')
        );
    }
});

function fetchDefaultValues(): void {
    const animsKey = localStorage.getItem('reduceAnimsKey');

    if (animsKey) {
        reduceAnims = animsKey === 'true';
    } else {
        reduceAnims = false;
        localStorage.setItem('reduceAnimsKey', 'false');
    }

    reduceAnimsToggle.checked = reduceAnims;
}

fetchDefaultValues();