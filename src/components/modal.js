import { currentProfile, handleEditFormSubmit } from "./profile-edit.js";
const cardContainer = document.querySelector(".places");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardImg = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = document.forms.edit_profile;
const popupList = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addCloseEsc();
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  removeCloseEsc();
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closePopup(popup);
    }
  }
}

function addCloseEsc() {
  document.addEventListener("keydown", function (evt) {
    closeEscPopup(evt);
  });
}

function removeCloseEsc() {
  document.removeEventListener("keydown", function (evt) {
    closeEscPopup;
  });
}

popupList.forEach(function (popup) {
  const popup_content = popup.querySelector(".popup__content");
  popup.addEventListener("click", function (evt) {
    const withinBoundaries = evt.composedPath().includes(popup_content);
    if (!withinBoundaries) {
      closePopup(popup);
    }
  });
});

editButton.addEventListener("click", openPopupEditProfile);
addButton.addEventListener("click", () => openPopup(newCardPopup));

function openPopupEditProfile() {
  openPopup(popupEdit);
  currentProfile(formEdit);
  formEdit.addEventListener("submit", handleEditFormSubmit);
}

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// cardsImgList.forEach((cardImg) => {
//   cardImg.addEventListener("click",() => {
//     openPopup(cardImg);
//   });
// });

cardContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__image")) {
    openPopup(cardImg);
  }
});
