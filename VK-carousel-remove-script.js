// ==UserScript==
// @name         Фикс нового дизайна ВК
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Исправляет проблемы в новом дизайне VK
// @author       DS27
// @match        https://vk.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/DS-27/VK-carousel-remove/refs/heads/main/VK-carousel-remove-script.js
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

    // Функция для изменения класса и стилей каруселей
    function modifyCarousels() {
        const carousels = document.querySelectorAll('.vkitBaseGallery__layer--JNMtq');
        carousels.forEach(carousel => {
            carousel.classList.replace('vkitBaseGallery__layer--JNMtq', 'Carusel_delited');
            carousel.style.removeProperty('display'); // Удаляем заданные свойства стиля
            carousel.style.width = '100%'; // Задаем ширину контейнера
            const children = Array.from(carousel.children);
            if (children.length > 0) {
                children.forEach((child, index) => {
                    if (index % 2 === 0) {
                        child.style.setProperty('display', 'inline-block');
                        child.style.setProperty('width', '49%');
                        child.style.setProperty('margin-right', '1%');
                    } else {
                        child.style.setProperty('display', 'inline-block');
                        child.style.setProperty('width', '49%');
                    }
                });
            }
        });
    }

    // Задача 2: Изменить класс и стили каруселей
    modifyCarousels();

    // Функция для изменения ширины элементов с id="page_layout" и id="page_body"
    function setWidths() {
        const pageLayout = document.getElementById('page_layout');
        if (pageLayout) {
            const layoutWidth = document.getElementById('layout_width_input').value;
            pageLayout.style.width = `${layoutWidth}%`;
            pageLayout.style.margin = '0 auto'; // Центрируем контейнер
        }

        const pageBody = document.getElementById('page_body');
        if (pageBody) {
            const bodyWidth = document.getElementById('body_width_input').value;
            pageBody.style.width = `${bodyWidth}%`;
            pageBody.style.margin = '0 auto'; // Центрируем контейнер
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

    // Функция для добавления полей ввода
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
            layoutWidthInput.value = '70';
            layoutWidthInput.style.width = '50%'; // Устанавливаем ширину инпута
            layoutWidthInput.style.borderRadius = '10px'; // Устанавливаем скругление инпута
            inputForm.appendChild(layoutWidthInput);

            const bodyWidthLabel = document.createElement('label');
            bodyWidthLabel.textContent = 'Ширина ленты (%): ';
            inputForm.appendChild(bodyWidthLabel);

            const bodyWidthInput = document.createElement('input');
            bodyWidthInput.id = 'body_width_input';
            bodyWidthInput.type = 'number';
            bodyWidthInput.value = '87';
            bodyWidthInput.style.width = '50%'; // Устанавливаем ширину инпута
            bodyWidthInput.style.borderRadius = '10px'; // Устанавливаем скругление инпута
            inputForm.appendChild(bodyWidthInput);

            sideBarInner.appendChild(inputForm);

            // Добавляем обработчики событий на изменение значений
            layoutWidthInput.addEventListener('input', setWidths);
            bodyWidthInput.addEventListener('input', setWidths);
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
