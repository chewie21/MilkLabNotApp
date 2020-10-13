`use strict`
const modalMenu = document.querySelector(`.menu`),
    menuButtonRight = document.querySelector(`.nav-header-menu-right`);

//Функции
//Подсвечивание ссылок
const activeLink = (target, param) => {
    document.querySelectorAll(param).forEach((item) => {
        if(item !== target) item.style.opacity = `0.5`;
        if(item === target) {
            item.style.opacity = `1`;
            item.addEventListener(`mouseout`, () => {
                document.querySelectorAll(param).forEach((item) => {
                    item.style.opacity = `1`;
                })
            }, {once:true});
        }
    });
};
//Закрытие меню по клику 
const closeMenu = (event) => {
    if(!event.target.closest(`.menu`) || 
        event.target.closest(`.menu-close`) || 
        event.target.closest(`.modal-menu-link`)) toggleMenu();
}
//Открытие меню
const toggleMenu = () => {
    if(!modalMenu.classList.contains(`active-menu`)) {
        menuButtonRight.querySelector(`img`).src = `img/rightMenuActive.png`;
        modalMenu.classList.add(`active-menu`);
        document.querySelector(`body`).classList.add(`scroll-hidden`);
        document.addEventListener(`click`, closeMenu);
    } else {
        menuButtonRight.querySelector(`img`).src = `img/menu.png`;
        modalMenu.classList.remove(`active-menu`);
        document.querySelector(`body`).classList.remove(`scroll-hidden`);
        document.removeEventListener(`click`, closeMenu);
    }
};

//Слушатели
//Отслеживаем наведение на элемент
document.addEventListener(`mouseover`, (event) => {
    let target = event.target;
    if(target.closest(`.nav-header-li`)) activeLink(target, `.nav-header-li`);
    if(target.closest(`.main-menu-li`)) activeLink(target, `.main-menu-li`);
    if(target.closest(`.nav-footer-li`)) activeLink(target, `.nav-footer-li`);
    if(target.closest(`.modal-menu-link`)) activeLink(target, `.modal-menu-link`);
    if(target.closest(`.nav-header-menu-left`)) {
        menuButtonLeft.querySelector(`img`).src = `img/leftMenuActive.png`;
        menuButtonLeft.addEventListener(`mouseout`, () => {
            menuButtonLeft.querySelector(`img`).src = `img/menu.png`;
        }, {once:true});
    }
});
//Отслеживаем клик
document.addEventListener(`click`, (event) => {
    let target = event.target;
    if(target.closest(`.footer-img`)) {
        scrollTo(0,0)
    }
    if(target.closest(`.open-map`)) {
        $(`#modal-map`).modal(`show`);
    }
    if(target.closest(`.nav-header-menu-right`) || target.closest(`.nav-header-menu-left`)) {
        toggleMenu();
    } 
});
