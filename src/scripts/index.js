import "../pages/index.css";
import "../components/profile-edit.js";
import { createCard, deleteCard, likeCard } from "../components/cards/cards.js";
import { closePopup } from "../components/modal.js";
import { initialCards } from "../components/cards/current-cards.js";
// Закрытие модальных окон
const popupList = document.querySelectorAll(".popup");
// Анимация модальных окон
const newCardPopup = document.querySelector(".popup_type_new-card");
const popupFullImage = document.querySelector(".popup_type_image");
const editPopup = document.querySelector(".popup_type_edit");
//Открытие картинки
const popupCardImage = document.querySelector(".popup_type_image");
const cardPopupImage = popupCardImage.querySelector(".popup__image");
const cardPopupCaption = popupCardImage.querySelector(".popup__caption");
//Новая карточка
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const pictureUrlInput = document.querySelector(".popup__input_type_url");
const card = {};
const formNewCard = document.forms.new_place;
//--------------
const cardNew = document.querySelector(".places__list");
//Кнопка закрытия
popupList.forEach(function (el) {
  el.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      closePopup(el);
    }
  });
});
//--------------------------------------------------------------------
// Анимация модальных окон
editPopup.classList.add("popup_is-animated");
newCardPopup.classList.add("popup_is-animated");
popupFullImage.classList.add("popup_is-animated");
//--------------------------------------------------------------------
//Открытие картинки
export const openImg = function (cardImg) {
  cardImg.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__image")) {
      cardPopupImage.src = cardImg.src;
      cardPopupCaption.textContent = cardImg.alt;
    }
  });
};
//--------------------------------------------------------------------

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  card.name = placeNameInput.value;
  card.link = pictureUrlInput.value;
  renderCard(card, deleteCard, likeCard, openImg);
  placeNameInput.value = "";
  pictureUrlInput.value = "";
  closePopup(newCardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formNewCard.addEventListener("submit", handleNewCardFormSubmit);

//Вывести карточку на страницу
const renderCard = function (card, deleteCard, likeCard, openImg) {
  const newCard = createCard(card, deleteCard, likeCard, openImg);
  cardNew.prepend(newCard);
};

//Рендерим текущие карточки
initialCards.forEach(function (item) {
  renderCard(item, deleteCard, likeCard, openImg);
});
