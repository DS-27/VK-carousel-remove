// ==UserScript==
// @name         Фикс нового дизайна ВК
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Делает изменения в новом дизайне ВКонтакте
// @author       DS27
// @match        https://vk.com/*
// @grant        none
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

    // Функция для изменения класса и стилей элементов
    function modifyCarousel() {
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
    modifyCarousel();

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

    // Задача 3: Изменить класс div с feed_wall или clear_fix feed_wall
    function modifyFeedWall() {
        document.querySelectorAll('.feed_wall--no-islands, .clear_fix.feed_wall').forEach(el => {
            el.classList.remove('feed_wall--no-islands', 'clear_fix');
            el.classList.add('feed_wall');
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
            bodyWidthLabel.textContent = ' Ширина ленты (%): ';
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
        modifyCarousel();
        modifyFeedWall();
        setWidths(); // Устанавливаем ширины после обнаружения изменений
    }).observe(document.body, { childList: true, subtree: true });

    // Инициализируем изменения при загрузке страницы
    hideElements('button.vkitBaseGallery__arrow--1CXpf');
    hideElements('span.vkitContentBadge__root--i6wr7');
    modifyCarousel();
    modifyFeedWall();
    addInputFields(); // Добавляем поля ввода
    setWidths(); // Устанавливаем начальные ширины
})();
