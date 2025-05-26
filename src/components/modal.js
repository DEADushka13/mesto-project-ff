export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addCloseEsc();
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  removeCloseEsc();
}

export function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closePopup(popup);
    }
  }
}

export function addCloseEsc() {
  document.addEventListener("keydown", closeEscPopup);
}

export function removeCloseEsc() {
  document.removeEventListener("keydown", closeEscPopup);
}

export function closePopupWithinBoundaries(popup) {
  const popup_content = popup.querySelector(".popup__content");
  popup.addEventListener("click", function (evt) {
    const withinBoundaries = evt.composedPath().includes(popup_content);
    if (!withinBoundaries) {
      closePopup(popup);
    }
  });
}

// export function openPopupEditProfile() {
//   openPopup(popupEdit);
//   addCurrentProfile(formEdit);
// }

// cardsImgList.forEach((cardImg) => {
//   cardImg.addEventListener("click",() => {
//     openPopup(cardImg);
//   });
// });

// cardContainer.addEventListener("click", function (evt) {
//   if (evt.target.classList.contains("card__image")) {
//     openPopup(popupFullCardImage);
//   }
// });
