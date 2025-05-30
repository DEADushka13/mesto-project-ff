import "./pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard
} from "./components/cards/card.js";
import {
  closePopup,
  openPopup,
  closePopupWithinBoundaries,
} from "./components/modal.js";
import { initialCards } from "./components/cards/cards.js";
// Закрытие модальных окон
const popupList = document.querySelectorAll(".popup");
// Анимация модальных окон
const newCardPopup = document.querySelector(".popup_type_new-card");
const popupFullCardImage = document.querySelector(".popup_type_image");
const editPopup = document.querySelector(".popup_type_edit");
//Открытие картинки
const cardPopupImage = popupFullCardImage.querySelector(".popup__image");
const cardPopupCaption = popupFullCardImage.querySelector(".popup__caption");
//Новая карточка
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const pictureUrlInput = document.querySelector(".popup__input_type_url");
const card = {};
const formNewCard = document.forms.new_place;
//--------------
const cardList = document.querySelector(".places__list");
//Редактирование профиля
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const currentProfileTitle = document.querySelector(".profile__title");
const currentProfileDescription = document.querySelector(".profile__description");
const formEdit = document.forms.edit_profile;
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

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
popupFullCardImage.classList.add("popup_is-animated");
//--------------------------------------------------------------------
//передача данных картинки
export const addCurrentImageData = function (cardImg) {
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
  renderCard(card, deleteCard, likeCard, openImagePopup);
  placeNameInput.value = "";
  pictureUrlInput.value = "";
  closePopup(newCardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formNewCard.addEventListener("submit", handleNewCardFormSubmit);
formEdit.addEventListener("submit", handleEditFormSubmit, true); //вытащил из функции открытия
//Вывести карточку на страницу
const renderCard = function (card, deleteCard, likeCard, openImagePopup) {
  const newCard = createCard(card, deleteCard, likeCard, openImagePopup);
  cardList.prepend(newCard);
};

//Рендерим текущие карточки
initialCards.forEach(function (item) {
  renderCard(item, deleteCard, likeCard, openImagePopup);
});

export function openPopupEditProfile(edit_form) {
  edit_form.elements.name.value = currentProfileTitle.textContent;
  edit_form.elements.description.value = currentProfileDescription.textContent;
  openPopup(editPopup);
}

//Обработчик нажатия submit
export function handleEditFormSubmit(evt) {
  evt.preventDefault();
  currentProfileTitle.textContent = nameInput.value;
  currentProfileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

popupList.forEach(function (popup) {
  closePopupWithinBoundaries(popup);
});

editButton.addEventListener("click", () => openPopupEditProfile(formEdit));
addButton.addEventListener("click", () => openPopup(newCardPopup));

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

function openImagePopup(cardImgData) {
  cardPopupImage.src = cardImgData.src;
  cardPopupCaption.textContent = cardImgData.alt;
  cardPopupImage.alt = cardImgData.alt;
  openPopup(popupFullCardImage);
}
