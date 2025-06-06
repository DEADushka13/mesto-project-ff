import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/cards/card.js";
import {
  closePopup,
  openPopup,
  closePopupWithinBoundaries,
} from "./components/modal.js";
// import { initialCards } from "./components/cards/cards.js";
import {
  enableValidation,
  clearValidation,
  validateRegex,
  validateText,
} from "./components/validation.js";
import {
  getUserInfo,
  getGroupCard,
  patchUserInfo,
  postNewCard,
  patchAvatar,
} from "./components/api.js";

const profileImage = document.querySelector(".profile__image");
const popupList = document.querySelectorAll(".popup");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const popupFullCardImage = document.querySelector(".popup_type_image");
const editPopup = document.querySelector(".popup_type_edit");
const editPopupFormElement = editPopup.querySelector(".popup__form");
const cardPopupImage = popupFullCardImage.querySelector(".popup__image");
const cardPopupCaption = popupFullCardImage.querySelector(".popup__caption");
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const pictureUrlInput = document.querySelector(".popup__input_type_url");
// const card = {};
const formNewCard = document.forms.new_place;
const cardList = document.querySelector(".places__list");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const currentProfileTitle = document.querySelector(".profile__title");
const currentProfileDescription = document.querySelector(
  ".profile__description"
);
const formEdit = document.forms.edit_profile;
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
// Avatar
const avatarEditPopup = document.querySelector(".popup_type_edit-avatar");
const avatarEditFormElement = avatarEditPopup.querySelector(".popup__form");
const avatarUrlInput = avatarEditFormElement.querySelector(
  ".popup__input_type_url"
);
const avatarEditButton = document.querySelector(".profile__image-edit-button");
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
avatarEditPopup.classList.add("popup_is-animated");
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
  const submitNewCardButton = newCardPopup.querySelector(".popup__button");
  renderLoading(true, submitNewCardButton, "Сохранить");
  const name = placeNameInput.value;
  const link = pictureUrlInput.value;
  postNewCard(name, link)
    .then((cardData) => {
      // const card = {};
      // card.name = cardData.name;
      // card.link = cardData.link;
      // card.likes = cardData.likes;
      renderCard(cardData, deleteCard, likeCard, openImagePopup, myId);
      placeNameInput.value = "";
      pictureUrlInput.value = "";
      closePopup(newCardPopup);
      clearValidation(newCardForm, validationConfig);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitNewCardButton, "Сохранить");
    });
  // renderCard(card, deleteCard, likeCard, openImagePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formNewCard.addEventListener("submit", handleNewCardFormSubmit);
formEdit.addEventListener("submit", handleEditFormSubmit, true); //вытащил из функции открытия
//Вывести карточку на страницу
const renderCard = function (card, deleteCard, likeCard, openImagePopup, myId) {
  const newCard = createCard(card, deleteCard, likeCard, openImagePopup, myId);
  cardList.prepend(newCard);
};

//Рендерим текущие карточки
// initialCards.forEach(function (item) {
//   renderCard(item, deleteCard, likeCard, openImagePopup);
// });

export function openPopupEditProfile(edit_form) {
  edit_form.elements.name.value = currentProfileTitle.textContent;
  edit_form.elements.description.value = currentProfileDescription.textContent;
  openPopup(editPopup);
}

//Обработчик нажатия submit
export function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitProfileButton = editPopup.querySelector(".popup__button");
  renderLoading(true, submitProfileButton, "Сохранить");
  const name = nameInput.value;
  const about = jobInput.value;
  patchUserInfo(name, about)
    .then((profileData) => {
      currentProfileTitle.textContent = profileData.name;
      currentProfileDescription.textContent = profileData.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitProfileButton, "Сохранить");
    });
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

// --------------ВАЛИДАЦИЯ------------------

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__input-error",
};

const customValidations = new Map();
customValidations.set(nameInput, validateText);
customValidations.set(jobInput, validateText);
customValidations.set(placeNameInput, validateText);

enableValidation(validationConfig, customValidations);

editButton.addEventListener("click", function () {
  nameInput.value = currentProfileTitle.textContent;
  jobInput.value = currentProfileDescription.textContent;
  clearValidation(editPopupFormElement, validationConfig);
  openPopup(editPopup);
});

// -----------------------------------------
// -----------------API---------------------
let myId;
Promise.all([getUserInfo(), getGroupCard()])
  .then(([dataProfile, cards]) => {
    myId = dataProfile._id;
    currentProfileTitle.textContent = dataProfile.name;
    currentProfileDescription.textContent = dataProfile.about;
    profileImage.style.backgroundImage = `url('${dataProfile.avatar}')`;

    cards.forEach((cardData) => {
      // const card = {};
      // card.name = cardData.name;
      // card.link = cardData.link;
      // card.likes = cardData.likes;
      renderCard(cardData, deleteCard, likeCard, openImagePopup, myId);
    });
  })
  .catch((err) => console.error(err));
// ---------------AVATAR--------------------
// const avatarEditPopup = document.querySelector(".popup_type_avatar");

avatarEditButton.addEventListener("click", function () {
  openPopup(avatarEditPopup);
});
avatarEditFormElement.addEventListener("submit", handleAvatarFormSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitAvatarButton =
    avatarEditFormElement.querySelector(".popup__button");
  renderLoading(true, submitAvatarButton, "Сохранить");

  const avatarUrl = avatarUrlInput.value;

  patchAvatar(avatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarEditPopup);
      avatarEditFormElement.reset();
      clearValidation(avatarEditFormElement, validationConfig);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitAvatarButton, "Сохранить");
    });
}

// -----------------------------------------
//---------------LOADING--------------------
function renderLoading(isLoading, buttonElement, defaultButtonText) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = defaultButtonText;
  }
}
// -----------------------------------------
