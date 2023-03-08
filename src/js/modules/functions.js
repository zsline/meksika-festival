import Swiper, { Navigation, Pagination } from "swiper";

import { photo } from './photo.js';

// console.log(photo);
const slider1 = document.querySelector('.first-fest__slider')
const slider2 = document.querySelector('.second-fest__slider')

function createSlider(year, slider) {
    let html = '';
    for (let i = 0; i < photo[year].length; i++) {
        html += `
        <div class="fest__slider-slide swiper-slide">
        <img src="${photo[year][i]}" alt="" class="fest__slider-img">
        </div>
        `
    }
    slider.lastElementChild.innerHTML = html;
}
if (document.querySelector('.slider')) {
    createSlider(2019, slider1);
    createSlider(2021, slider2);
}

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
if (document.querySelector('.first-fest__slider')) {
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
}

if (document.querySelector('.second-fest__slider')) {
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
}
if (document.querySelector('.organizers-offer__slider')) {
    const swiper2 = new Swiper('.organizers-offer__slider', {
        autoplay: {
            delay: 2500,
        },
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        freeMode: true,
        navigation: {
            nextEl: '.fest-next',
            prevEl: '.fest-prev',
        },
    });
}