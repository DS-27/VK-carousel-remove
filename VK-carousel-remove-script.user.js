// ==UserScript==
// @name         Фикс нового дизайна ВК
// @namespace    http://tampermonkey.net/
// @version      0.92
// @description  Исправляет проблемы в новом дизайне VK
// @author       DS27
// @match        https://vk.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/DS-27/VK-carousel-remove/refs/heads/main/VK-carousel-remove-script.user.js
// @downloadURL    https://raw.githubusercontent.com/DS-27/VK-carousel-remove/refs/heads/main/VK-carousel-remove-script.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Функция для скрытия элементов
    function hideElements(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.style.width = '0';
            el.style.height = '0';
            el.style.display = 'none';
        });
    }

    // Задача 1: Скрыть ненужные кнопки и бэджи
    hideElements('button.vkitBaseGallery__arrow--1CXpf');
    hideElements('span.vkitContentBadge__root--i6wr7');

    // Добавляем стили к элементам с id "wk_box", "wk_content"
    document.querySelectorAll('#wk_box, #wk_content').forEach(el => {
        el.style.width = '900px';
        el.style.height = 'auto';
    });

    // Добавляем стили к элементам с классами
    document.querySelectorAll('.popup_box_container.popup_box_container--no-body.popup_box_container--no-shadow, .vkitModalBox__container--uATK0.vkuiInternalModalBox').forEach(el => {
        el.style.width = '900px';
        el.style.height = 'auto';
        el.style.marginTop = '50px'; // Добавляем верхний отступ
    });

    // Функция для изменения класса и стилей элементов
    function modifyCarousels() {
        document.querySelectorAll('.vkitBaseGallery__layer--JNMtq').forEach(el => {
            el.className = 'Carusel_delited';
            el.style.display = 'flex';
            el.style.flexWrap = 'wrap';

            // Подсчитываем количество дочерних элементов
            const slideCount = el.querySelectorAll('.vkitBaseGallery__slide--JhgoZ').length;

            // Устанавливаем ширину для каждого слайда в зависимости от количества
            if (slideCount <= 4) {
                el.style.flexDirection = 'row';
                el.style.alignItems = 'stretch';
                el.querySelectorAll('.vkitBaseGallery__slide--JhgoZ').forEach(slide => {
                    slide.style.width = '50%';
                    slide.style.boxSizing = 'border-box';
                });
            } else if (slideCount <= 10) {
                el.style.flexDirection = 'row';
                el.style.alignItems = 'stretch';
                el.querySelectorAll('.vkitBaseGallery__slide--JhgoZ').forEach(slide => {
                    slide.style.width = '33.33%';
                    slide.style.boxSizing = 'border-box';
                });
            }
        });
    }

    // Задача 2: Изменить класс и стили каруселей
    modifyCarousels();

    // Функция для изменения ширины элементов с id="page_layout" и id="page_body"
    function setWidths() {
        const pageLayout = document.getElementById('page_layout');
        const pageBody = document.getElementById('page_body');

        if (pageLayout && pageBody) {
            const layoutWidth = parseInt(document.getElementById('layout_width_input').value, 10);
            const windowWidth = window.innerWidth;

            const pageLayoutPx = (windowWidth * layoutWidth) / 100;
            const pageBodyPx = pageLayoutPx - 160;

            pageLayout.style.width = `${pageLayoutPx}px`;
            pageBody.style.width = `${pageBodyPx}px`;

            pageLayout.style.margin = '0 auto'; // Центрируем контейнер
            pageBody.style.margin = '0 auto';
            pageBody.style.paddingTop = '50px'; // Добавляем верхний отступ
        }
    }

    // Задача 3: Изменить класс div с feed_wall--no-islands и заменять его на feed_wall
    function modifyFeedWall() {
        document.querySelectorAll('.feed_wall--no-islands, .clear_fix.feed_wall').forEach(el => {
            el.classList.remove('feed_wall--no-islands', 'clear_fix');
            el.classList.add('feed_wall');
        });
    }

    function modifyCarouselViewport() {
        const viewports = document.querySelectorAll('.vkitBaseGallery__viewport--oBrr7');
        viewports.forEach(viewport => {
            if (viewport.parentElement.classList.contains('vkitCarousel__carousel--DOfcX') &&
                viewport.parentElement.classList.contains('vkitCarousel__withOffset--OdJtQ') &&
                viewport.parentElement.classList.contains('vkitBaseGallery__host--Gq3V7') &&
                viewport.parentElement.classList.contains('vkitBaseGallery__alignCenter--WeQNT') &&
                viewport.parentElement.classList.contains('vkitBaseGallery__draggable--DUONP') &&
                viewport.parentElement.classList.contains('vkuiRootComponent')) {
                viewport.style.width = '30%';
            }
        });
    }

    // Функция для добавления поля ввода
    function addInputFields() {
        const sideBarInner = document.getElementById('side_bar_inner');
        if (sideBarInner) {
            const inputForm = document.createElement('div');
            inputForm.style.marginTop = '20px';
            inputForm.style.display = 'flex'; // Добавляем flex к контейнеру
            inputForm.style.flexDirection = 'column'; // Устанавливаем направление flex

            const layoutWidthLabel = document.createElement('label');
            layoutWidthLabel.textContent = 'Ширина страницы (%): ';
            inputForm.appendChild(layoutWidthLabel);

            const layoutWidthInput = document.createElement('input');
            layoutWidthInput.id = 'layout_width_input';
            layoutWidthInput.type = 'number';
            layoutWidthInput.value = '70'; // Начальное значение
            layoutWidthInput.style.width = '50%'; // Устанавливаем ширину инпута
            layoutWidthInput.style.borderRadius = '10px'; // Устанавливаем скругление инпута
            inputForm.appendChild(layoutWidthInput);

            sideBarInner.appendChild(inputForm);

            // Добавляем обработчики событий на изменение значений
            layoutWidthInput.addEventListener('input', setWidths);
        }
    }

    // Слушатель для динамически загружаемого контента
    new MutationObserver(() => {
        hideElements('button.vkitBaseGallery__arrow--1CXpf');
        hideElements('span.vkitContentBadge__root--i6wr7');
        document.querySelectorAll('#wk_box, #wk_content').forEach(el => {
            el.style.width = '900px';
            el.style.height = 'auto';
        });
        document.querySelectorAll('.popup_box_container.popup_box_container--no-body.popup_box_container--no-shadow, .vkitModalBox__container--uATK0.vkuiInternalModalBox').forEach(el => {
            el.style.width = '900px';
            el.style.height = 'auto';
            el.style.marginTop = '50px'; // Добавляем верхний отступ
        });
        modifyCarousels();
        modifyFeedWall();
        modifyCarouselViewport();
        setWidths(); // Устанавливаем ширины после обнаружения изменений
    }).observe(document.body, { childList: true, subtree: true });

    // Инициализируем изменения при загрузке страницы
    hideElements('button.vkitBaseGallery__arrow--1CXpf');
    hideElements('span.vkitContentBadge__root--i6wr7');
    document.querySelectorAll('#wk_box, #wk_content').forEach(el => {
        el.style.width = '900px';
        el.style.height = 'auto';
    });
    document.querySelectorAll('.popup_box_container.popup_box_container--no-body.popup_box_container--no-shadow, .vkitModalBox__container--uATK0.vkuiInternalModalBox').forEach(el => {
        el.style.width = '900px';
        el.style.height = 'auto';
        el.style.marginTop = '50px'; // Добавляем верхний отступ
    });
    modifyCarousels();
    modifyFeedWall();
    addInputFields(); // Добавляем поля ввода
    setWidths(); // Устанавливаем начальные ширины
})();
