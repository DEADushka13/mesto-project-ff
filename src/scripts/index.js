import "../pages/index.css"; // добавьте импорт главного файла стилей
// import './cards.js';
import "../components/profile-edit.js";
import "../components/new-card.js";
import "../components/open-card-img.js";
import "../components/close-popup.js"; //ТУТ НЕ НАДО ВСЁ
import "../components/open-popup.js";

import { initialCards } from "./cards.js";
// import * as modal from '../components/modal-window.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardNew = document.querySelector(".places__list");

// @todo: Функция создания карточки
export const createCard = function (card, deleteCard, likeCard) {
  // клонируем
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  //наполняем
  const cardImg = cardElem.querySelector(".card__image");
  cardElem.querySelector(".card__title").textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.name;
  //кнопка удаления текущей карточки
  const deleteButton = cardElem.querySelector(".card__delete-button");
  const likeButton = cardElem.querySelector(".card__like-button");
  //следим и удаляем
  deleteCard(cardElem, deleteButton);
  likeCard(likeButton);
  return cardElem;
};

// @todo: Функция удаления карточки
export const deleteCard = function (cardElem, deleteButton) {
  deleteButton.addEventListener("click", function () {
    cardElem.remove();
  });
};

export const likeCard = function (likeButton) {
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      likeButton.classList.remove("card__like-button_is-active");
    } else {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
};

// @todo: Вывести карточки на страницу
const renderCard = function (card, deleteCard, likeCard) {
  const newCard = createCard(card, deleteCard, likeCard);
  cardNew.prepend(newCard);
};

initialCards.forEach(function (item) {
  renderCard(item, deleteCard, likeCard);
});
