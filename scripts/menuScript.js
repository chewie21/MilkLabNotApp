`use strict`

const modalCard = document.querySelector(`#modal-card`),
    menuButtonLeft = document.querySelector(`.nav-header-menu-left`),
    arrowUp = document.querySelector(`.arrow-up`),
    sliderTop = document.querySelector(`.carousel-inner`);

//Запрос к серверу
const getData = (succsess, error) => {
    return fetch(`./dataBase.json`, {
        method: `GET`,
    }).then((response) => response.json())
        .then((data) => succsess(data))
            .catch(error);
}

//Функции
//Отображение карточек
const renderCards = (productArr, productGroupSet) => {
    const listeningToMobile = () => {
        if(document.documentElement.clientWidth <= 767) {
            window.removeEventListener(`resize`, listeningToMobile);
            document.querySelector(`main`).querySelectorAll(`.card-deck`).forEach((item) => {
                item.remove();
            });
            productArr.forEach((product) => {
                const group = document.querySelector(`#${product.group}`);
                const card = document.querySelector(`.product-card-mobile`).cloneNode(true);
                card.querySelector(`.product-card-img-mobile`).src = product.src;
                card.querySelector(`.product-card-title-mobile`).textContent = product.name;
                card.querySelector(`.product-card-text-mobile`).textContent = product.text;
                card.querySelector(`.product-card-shortText-mobile`).textContent = product.shortText;
                card.querySelector(`.product-card-footer-mobile`).textContent = product.coast;
                card.classList.remove(`hide`);
                group.append(card);
            });
            window.addEventListener(`resize`, listeningToNotMobile)
        }
    };

    const listeningToNotMobile = () => {
        if(document.documentElement.clientWidth > 767) {
            window.removeEventListener(`resize`, listeningToNotMobile);
            document.querySelector(`main`).querySelectorAll(`.card`).forEach((item) => {
                item.remove();
            });
            //Спавним карточные столы
            productGroupSet.forEach((item) => {
                const group = document.querySelector(`#${item}`);
                //Создаем карточный стол
               const cardDeck = document.createElement(`div`);
               cardDeck.classList.add(`card-deck`);
               group.append(cardDeck);
            });
            productArr.forEach((product) => {
                const group = document.querySelector(`#${product.group}`);
                const cardDeck = group.querySelector(`.card-deck`);
                const card = document.querySelector(`.product-card`).cloneNode(true);
                card.querySelector(`.product-card-img`).src = product.src;
                card.querySelector(`.product-card-title`).textContent = product.name;
                card.querySelector(`.product-card-shortText`).textContent = product.shortText;
                card.querySelector(`.product-card-text`).textContent = product.text;
                card.querySelector(`.product-card-footer`).textContent = product.coast;
                card.classList.remove(`hide`);
                cardDeck.append(card);
            });
            window.addEventListener(`resize`, listeningToMobile);
        };
    };

    //Карточки для большого экрана
    if(document.documentElement.clientWidth > 767) {
        //Спавним карточные столы
        productGroupSet.forEach((item) => {
            const group = document.querySelector(`#${item}`);
            //Создаем карточный стол
            const cardDeck = document.createElement(`div`);
            cardDeck.classList.add(`card-deck`);
            group.append(cardDeck);
        });
        productArr.forEach((product) => {
            const group = document.querySelector(`#${product.group}`);
            const cardDeck = group.querySelector(`.card-deck`);
            const card = document.querySelector(`.product-card`).cloneNode(true);
            card.querySelector(`.product-card-img`).src = product.src;
            card.querySelector(`.product-card-title`).textContent = product.name;
            card.querySelector(`.product-card-text`).textContent = product.text;
            card.querySelector(`.product-card-shortText`).textContent = product.shortText;
            card.querySelector(`.product-card-footer`).textContent = product.coast;
            card.classList.remove(`hide`);
            cardDeck.append(card);
        });
        window.addEventListener(`resize`, listeningToMobile);
    };
    //Карточки для мобильного
    if(document.documentElement.clientWidth <= 767) {
        productArr.forEach((product) => {
            const group = document.querySelector(`#${product.group}`);
            const card = document.querySelector(`.product-card-mobile`).cloneNode(true);
            card.querySelector(`.product-card-img-mobile`).src = product.src;
            card.querySelector(`.product-card-title-mobile`).textContent = product.name;
            card.querySelector(`.product-card-text-mobile`).textContent = product.text;
            card.querySelector(`.product-card-shortText-mobile`).textContent = product.shortText;
            card.querySelector(`.product-card-footer-mobile`).textContent = product.coast;
            card.classList.remove(`hide`);
            group.append(card);
        });
        window.addEventListener(`resize`, listeningToNotMobile);
    };
};

//Загрузка страницы
const runApplication = () => {
    let productArr = [];
    let productGroupSet = new Set();
    getData((item) => {
        productArr = item;
        productArr.forEach((product) => {
            productGroupSet.add(product.group);
        });
        renderCards(productArr, productGroupSet);
        //Слушатель клика
        document.addEventListener(`click`, (event) => {
            let target = event.target;
            if(target.closest(`.product-card-mobile`) || target.closest(`.product-card`)) {
                while(!target.classList.contains(`card`)) {
                    target = target.parentElement;
                }
                modalCard.querySelector(`.modal-card-img`).src = target.querySelector(`img`).src;
                modalCard.querySelector(`.modal-card-title`).textContent = target.querySelector(`.title-copy`).textContent;
                modalCard.querySelector(`.modal-card-text`).textContent = target.querySelector(`.text-copy`).textContent;
                modalCard.querySelector(`.modal-card-coast`).textContent = target.querySelector(`.coast-copy`).textContent;
                $(`#modal-card`).modal(`toggle`);
            }
            if(target.closest(`.modal-card-close`)) {
                $(`#modal-card`).modal(`toggle`);
            }
            if(target.closest(`.arrow-up`)) {
                scrollTo(0,0);
            }
            if(target.closest(`.main-scroll`)) {
                $(`#main-menu-tab`).tab(`show`);
                setTimeout(() => 
                    document.querySelector(`${target.hash}`).scrollIntoView(true),
                    500
                );
            }
            if(target.closest(`.bar-scroll`)) {
                $(`#bar-card-tab`).tab(`show`);
                setTimeout(() => 
                    document.querySelector(`${target.hash}`).scrollIntoView(true),
                    500
                );             
            }
        });
        window.addEventListener(`scroll`, () => {
            if(pageYOffset >= sliderTop.getBoundingClientRect().height + 61) {
                menuButtonLeft.style.display = `block`;
                arrowUp.style.display = `block`;
            } else {
                arrowUp.style.display = `none`;
                menuButtonLeft.style.display = `none`;
                menuButtonLeft.querySelector(`img`).src = `img/menu.png`;
                modalMenu.classList.remove(`active-menu`);
            }
        });
    },
    () => {
        //Заглушка при ошибке сервера
    });
};
runApplication();

