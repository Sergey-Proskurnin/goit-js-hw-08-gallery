// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону. - Add
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
//  чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img,
//  и указываться в href ссылки (это необходимо для доступности).

// Дополнительно
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
import images from './gallery-items.js';

// console.log(images);

const imadgesListRef = document.querySelector('.js-gallery');
// const modalRef = document.querySelector('.modal');
// const modalImgRef = document.querySelector('.modal-img');
// const formRef = document.querySelector(".form");
// const inputRef = document.querySelector(".todo");
// const listRef = document.querySelector(".todo-list");
// const filterRef = document.querySelector('.filter')

// document.body.prepend(imadgesListRef);

const imadgesMarkup = images.reduce(
  (acc, { preview, original, description }) => {
    return (
      acc +
      `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
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
console.log(imadgesMarkup);
imadgesListRef.insertAdjacentHTML('afterbegin', imadgesMarkup);

