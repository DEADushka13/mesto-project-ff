import { createCard, deleteCard, likeCard } from "./cards.js";
import { openImg } from "./open-card-img.js";

const new_card_Element = document.querySelector(".popup_type_new-card");
const place_nameInput = document.querySelector(".popup__input_type_card-name");
const pic_urlInput = document.querySelector(".popup__input_type_url");
const card = {};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
  card.name = place_nameInput.value;
  card.link = pic_urlInput.value;
  createCard(card, deleteCard, likeCard, openImg);
  place_nameInput.value = "";
  pic_urlInput.value = "";
  new_card_Element.classList.remove("popup_is-opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
new_card_Element.addEventListener("submit", handleFormSubmit);
