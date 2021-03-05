// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону. - Add
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. - Add
// Открытие модального окна по клику на элементе галереи. -Add
// Подмена значения атрибута src элемента img.lightbox__image. -Add
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].-Add
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, -Add
//  чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее. -Add

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img,
//  и указываться в href ссылки (это необходимо для доступности).

// Дополнительно
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay. -Add
// Закрытие модального окна по нажатию клавиши ESC. -Add
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо" -Add

import images from './gallery-items.js';

const bodyRef = document.querySelector('body');
const imadgesListRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalOverlay = document.querySelector('.lightbox__overlay');
const modalImgRef = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('.lightbox__button');

let currentImg = 0;
let currentAlt = 0;

const imgArray = images.reduce((acc, { original }) => {
  acc.push(original);
  return acc;
}, []);

const altArray = images.reduce((acc, { description }) => {
  acc.push(description);
  return acc;
}, []);

const imadgesMarkup = images.reduce(
  (acc, { preview, original, description }) => {
    return (
      acc +
      `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
    target="_blank" 
    rel="noreferrer noopener"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    );
  },
  '',
);

imadgesListRef.insertAdjacentHTML('afterbegin', imadgesMarkup);

imadgesListRef.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.localName === 'img') {
    addImgModal();
    currentImg = imgArray.indexOf(modalImgRef.src);
    currentAlt = altArray.indexOf(modalImgRef.alt);
  }
});

closeModalBtn.addEventListener('click', () => {
  removeImgModal();
});

modalOverlay.addEventListener('click', event => {
  if (event.target.localName === 'img') {
    return;
  }
  removeImgModal();
});

window.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    removeImgModal();
  }
});

function removeImgModal() {
  bodyRef.classList.remove('is-open');
  modalRef.classList.remove('is-open');
  modalImgRef.src = '';
  modalImgRef.alt = '';
}

function addImgModal() {
  bodyRef.classList.add('is-open');
  modalRef.classList.add('is-open');
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;
}

window.addEventListener('keyup', event => {
  if (event.key === 'ArrowRight') {
    currentImg === imgArray.length - 1 ? (currentImg = 0) : currentImg++;
    modalImgRef.src = imgArray[currentImg];
    currentAlt === altArray.length - 1 ? (currentAlt = 0) : currentAlt++;
    modalImgRef.alt = altArray[currentAlt];
  }
});

window.addEventListener('keyup', event => {
  if (event.key === 'ArrowLeft') {
    currentImg === 0 ? (currentImg = imgArray.length - 1) : currentImg--;
    modalImgRef.src = imgArray[currentImg];
    currentAlt === 0 ? (currentAlt = altArray.length - 1) : currentAlt--;
    modalImgRef.alt = altArray[currentAlt];
  }
});
