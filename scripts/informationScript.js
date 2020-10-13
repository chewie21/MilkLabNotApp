`use strict`
class servicesSlide {
    constructor({main, wrap, next, prev, slidesToShow}) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.option = {
            position: 0,
            slidesToShow: slidesToShow,
        }; 
    };

    init() {
        this.controllService();
    };

    controllService() {
        this.prev.addEventListener(`click`, this.prevSlider.bind(this));
        this.next.addEventListener(`click`, this.nextSlider.bind(this));
    };

    prevSlider(event) {
        event.preventDefault();
        console.log()
        --this.option.position;
        if(this.option.position < 0) {
            this.option.position = this.slides.length - this.option.slidesToShow;
        }
        this.wrap.style.transform = `translateX(-${this.option.position * (100 / this.option.slidesToShow)}%)`
    };
    nextSlider(event) {
        event.preventDefault();
        ++this.option.position;
        if(this.option.position > this.slides.length - this.option.slidesToShow) {
            this.option.position = 0;
        }
        this.wrap.style.transform = `translateX(-${this.option.position * (100 / this.option.slidesToShow)}%)`
    };
    firstSlide() {
        this.option.position = 0;
        this.wrap.style.transform = `translateX(-${this.option.position * (100 / this.option.slidesToShow)}%)`
    }
};

const option = {
    main: `.card-row`,
    wrap: `.cards`,
    next: `#arrow-right`,
    prev: `#arrow-left`,
    slidesToShow: 4
};

const mobileSlider = () => {
    option.slidesToShow = 1;
    thisSlider = new servicesSlide(option);
    thisSlider.firstSlide();
    thisSlider.init();
}
const mediumSlider = () => {
    option.slidesToShow = 2;
    thisSlider = new servicesSlide(option);
    thisSlider.firstSlide();
    thisSlider.init();
}
const largeSlider = () => {
    option.slidesToShow = 4;
    thisSlider = new servicesSlide(option);
    thisSlider.firstSlide();
    thisSlider.init();
}

if(document.documentElement.clientWidth > 991) {
    largeSlider();
} else if (document.documentElement.clientWidth > 767) {
    mediumSlider();
} else if (document.documentElement.clientWidth <= 767) {
    mobileSlider();
}

window.addEventListener(`resize`, () => {
    if(document.documentElement.clientWidth > 991) {
        largeSlider();
        if(modalMenu.classList.contains(`active-menu`)) toggleMenu();
    } else if (document.documentElement.clientWidth > 767) {
        mediumSlider();
        if(modalMenu.classList.contains(`active-menu`)) toggleMenu();
    } else if (document.documentElement.clientWidth <= 767) {
        mobileSlider();
    }
});