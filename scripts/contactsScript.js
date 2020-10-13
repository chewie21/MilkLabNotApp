window.addEventListener(`resize`, () => {
    if (document.documentElement.clientWidth > 767) {
        if(modalMenu.classList.contains(`active-menu`)) toggleMenu();
    }
});
