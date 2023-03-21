import Swiper, { Navigation, Pagination } from "swiper";

import { photo } from './photo.js';
import { partners } from './partners.js';
import { Modal } from "./modal.js";

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

const slider1 = document.querySelector('.first-fest__slider');
const slider2 = document.querySelector('.second-fest__slider');
const partnersBox = document.querySelector('.organizers-top__inner');
const modalBox = document.querySelector('.modal');
const sliderPartners = document.querySelector('.organizers-offer__slider-wrapper');

//====================================================
//слайдеры основные
//====================================================
// генератор слайдеров по годам
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
// генератор списка организаторов фестиваля
function createPartners(partners) {
    let html = '';
    let modalHtml = '';
    for (let i = 0; i < partners.length; i++) {
        html += `
        <div class="fest__info-item">
            <p class="fest__info-text">
                    ${partners[i].title} "${partners[i].yourName}"<br>${partners[i].desc}
            </p>
                <div data-name="${partners[i].dataName}" class="fest__info-num organizers-top__img persone modal-btn"  data-path="${[i]}" data-animation="fadeInUp" data-speed="700">
                    <img src="${partners[i].img}" alt="">
                </div>
            <div class="fest__info-title">
                ${partners[i].name}
            </div>

        </div>
        `
        modalHtml += `
        <div class="modal__container" data-target="${[i]}">
            <button class="modal-close">Закрыть</button>
                <div class="modal-content">
                    <span>${partners[i].name}</span>, ${partners[i].title} <span>"${partners[i].yourName}"</span> ${partners[i].function}<br>
                    <div data-slider="slider-${partners[i].dataName}" class="slider-${partners[i].dataName} modal-content__slider swiper swiper-modal" style="position: relative;">
                    <div class="fest-btns">
                    <div class="next-slider-${partners[i].dataName} arrow-item-next arrow-btn">
                        <img src="img/arrow-next.svg" alt="">
                    </div>
                    <div class="prev-slider-${partners[i].dataName} arrow-item-prev arrow-btn">
                        <img src="img/arrow-prev.svg" alt="">
                    </div>
                </div>
                        <div class="swiper-wrapper" style="min-width:0;">
                           ${sliderModal(partners, partners[i].dataName)}
                        </div>
                    </div>
                </div>
        </div>
        `
    }
    partnersBox.innerHTML = html;
    modalBox.innerHTML = modalHtml;
}
// генератор слайдера организаторов фестиваля
function createPartnersSlide(partners) {
    let html = '';
    for (let i = 0; i < partners.length; i++) {
        if (partners[i].share == true) {
            html += `
        <div data-hash="slide-${[i]}" class="swiper-slide organizers-offer__slider-slide">
        <div class="organizers-offer__slider-inner">
            <div class="organizers-offer__slider-info">
                <div class="organizers-offer__slider-title">
                    <div class="organizers-offer__slider-logo">
                        <img src="img/logo.png" alt="">
                    </div>
                    <div class="organizers-offer__slider-name">
                        <h3>${partners[i].yourName}</h3>
                    </div>
                </div>
                <div class="organizers-offer__slider-text">
                    <p>
                    ${partners[i].title} <span>"${partners[i].yourName}"</span> ${partners[i].loc}. Початок роботи ${partners[i].data}. ${partners[i].text}.<br>Керівник: <span>${partners[i].name}</span>
                    </p>
                </div>
            </div>
            <div class="organizers-offer__slider-img">
                <img src="${partners[i].image}" alt="">
            </div>
        </div>
    </div>
        `
        }

    }
    sliderPartners.innerHTML = html;
}

//====================================================
// слайдеры модальных окон
//====================================================
// слайдер модального окна основной по мероприятиям
//=========================

// внешний слайдер модального окна
function sliderModal(item, name) {
    let items = [];
    for (let i = 0; i < item.length; i++) {
        let nameItem = item[i].dataName;
        if (nameItem == name) {
            let html = '';
            for (let x = 0; x < item[i].slideImages.length; x++) {
                html += `<div class="swiper-slide">
                            <p class="slide-text">${item[i].slideImages[x].text}</p>
                            <div data-slider="slider-${item[i].dataName}-${[x]}" class="slider-${item[i].dataName}-${[x]} swiper slider-item">
                            <div class="fest-btns">
                            <div class="next-slider-${item[i].dataName}-${[x]} arrow-item-next arrow-btn">
                                <img src="img/arrow-next.svg" alt="">
                            </div>
                            <div class="prev-slider-${item[i].dataName}-${[x]} arrow-item-prev arrow-btn">
                                <img src="img/arrow-prev.svg" alt="">
                            </div>
                        </div>
                            <div class="swiper-wrapper">
                            ${createSliderIvent(item[i].slideImages[x].img)}
                            </div>
                            </div>
                        </div>`

            }
            items.push(html);
            html = '';
        }
    }
    return items.join('');
}
//==============================================
// слайдер фотографий мероприятия
function createSliderIvent(images) {
    let htmlImg = '';
    for (let i = 0; i < images.length; i++) {
        htmlImg += `
    <img class="swiper-slide" src="${images[i]}" alt=""/>
    `
    }
    return htmlImg
}
if (sliderPartners) {
    createPartnersSlide(partners)
}
if (partnersBox) {
    createPartners(partners)
}
if (document.querySelector('.slider')) {
    createSlider(2019, slider1);
    createSlider(2021, slider2);
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
        grabCursor: true,
        hashNavigation: {
            // watchState: true,
        },
        navigation: {
            nextEl: '.fest-next',
            prevEl: '.fest-prev',
        },
    });
}

const sliders = document.querySelectorAll('.slider-item')
if (sliders) {
    for (let i = 0; i < sliders.length; i++) {
        let data = sliders[i].dataset['slider'];
        new Swiper(`.${data}`, {
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: `.next-${data}`,
                prevEl: `.prev-${data}`,
            },
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            freeMode: true,
            grabCursor: true,
            // observer: true,
            // observeParents: true
        })
    }
}
const slidersModal = document.querySelectorAll('.swiper-modal')
if (slidersModal) {

    for (let i = 0; i < slidersModal.length; i++) {
        let data = slidersModal[i].dataset['slider'];
        new Swiper(`.${data}`, {
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: `.next-${data}`,
                prevEl: `.prev-${data}`,
            },
            slidesPerView: 1,
            spaceBetween: 50,
            freeMode: true
        })
    }
}



new Modal();