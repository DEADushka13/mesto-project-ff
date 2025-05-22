import "./new-card";
import { openImg } from "./open-card-img";
import { initialCards } from "./current-cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardNew = document.querySelector(".places__list");

//Создать карточку
export const createCard = function (card, deleteCard, likeCard, openImg) {
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
  openImg(cardImg);
  cardNew.prepend(cardElem);
  return cardElem;
};

//Удаление карточки
export const deleteCard = function (cardElem, deleteButton) {
  deleteButton.addEventListener("click", function () {
    cardElem.remove();
  });
};

//лайкнуть карточку
export const likeCard = function (likeButton) {
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      likeButton.classList.remove("card__like-button_is-active");
    } else {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
};

//Вывести карточку на страницу
const renderCard = function (card, deleteCard, likeCard, openImg) {
  const newCard = createCard(card, deleteCard, likeCard, openImg);
  cardNew.prepend(newCard);
};

//Рендерим текущие карточки
initialCards.forEach(function (item) {
  renderCard(item, deleteCard, likeCard, openImg);
});
