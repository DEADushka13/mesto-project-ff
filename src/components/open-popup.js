// Открытие модальных окон
import { close_withinclick, close_esc } from "./close-popup.js";
import { currentProfile,handleFormSubmit} from "./profile-edit.js";
const profile = document.querySelector(".profile");
const places = document.querySelector(".places");
const new_card_popup = document.querySelector(".popup_type_new-card");
const card_img = document.querySelector(".popup_type_image");
const edit_popup = document.querySelector(".popup_type_edit");
const edit_form = document.forms.edit_profile;


profile.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    new_card_popup.classList.add("popup_is-opened");
    close_withinclick(new_card_popup);
    close_esc(new_card_popup);
  }
  if (evt.target.classList.contains("profile__edit-button")) {
    edit_popup.classList.add("popup_is-opened");
    currentProfile(edit_form);
    edit_popup.addEventListener("submit", handleFormSubmit);
    close_withinclick(edit_popup);
    close_esc(edit_popup);
  }
});

places.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__image")) {
    card_img.classList.add("popup_is-opened");
    close_withinclick(card_img);
    close_esc(card_img);
  }
});
