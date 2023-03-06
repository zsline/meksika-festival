import Swiper, { Navigation, Pagination } from "swiper";

/* Проверка поддержки webp, добавление класса для html */
export function isWebp() {
    //проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function() {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    //добавление класса _webp или _no-webp для HTML
    testWebP(function(support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

if (document.querySelector('.nav-menu')) {
    const btn = document.querySelector('.nav-menu__btn');
    const menu = document.querySelector('.nav-menu');
    btn.addEventListener('click', () => {
        menu.classList.toggle('nav-menu--active');
    })
}

const swiper = new Swiper('.first-fest__slider, .second-fest__slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,

    navigation: {
        nextEl: '.fest__slider-next',
        prevEl: '.fest__slider-prev',
    },
    autoplay: {
        delay: 3000,
    },
});
const swiper2 = new Swiper('.second-fest__slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,

    navigation: {
        nextEl: '.second__slider-next',
        prevEl: '.second__slider-prev',
    },
    autoplay: {
        delay: 3000,
    },
});

// const swiper = new Swiper('.first-fest__slider');