import "../pages/index.css"; // добавьте импорт главного файла стилей
// import './cards.js';
import "../components/profile-edit.js";
import "../components/new-card.js";
import "../components/open-card-img.js";
import "../components/close-popup.js";

import { initialCards } from "./cards.js";
// import * as modal from '../components/modal-window.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardNew = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = function (card, deleteCard) {
  // клонируем
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  //наполняем
  const cardImg = cardElem.querySelector(".card__image");
  cardElem.querySelector(".card__title").textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.name;
  //кнопка удаления текущей карточки
  const deleteButton = cardElem.querySelector(".card__delete-button");
  //следим и удаляем
  deleteCard(cardElem, deleteButton);
  return cardElem;
};

// @todo: Функция удаления карточки
const deleteCard = function (cardElem, deleteButton) {
  deleteButton.addEventListener("click", function () {
    cardElem.remove();
  });
};

// @todo: Вывести карточки на страницу
const renderCard = function (card, deleteCard) {
  const newCard = createCard(card, deleteCard);
  cardNew.prepend(newCard);
};

initialCards.forEach(function (item) {
  renderCard(item, deleteCard);
});
